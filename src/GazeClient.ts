import { Subscriptions, Subscription } from './Subscription';
import { FetchGazeRequestor } from './FetchGazeRequestor';
import { Callback } from './Types';
import { TopicsResolver } from './TopicsResolver';
import { Middleware } from './Middleware';
import { LinkedList } from './LinkedList';
import { GazeRequestor } from './GazeRequestor';
import { SseClient } from './SseClient';
import { BetterEventSource } from './BetterEventSource';

class GazeClient {
    
    private connected = false;
    private subscriptions: Subscriptions = new Subscriptions();
    private middlewareList = new LinkedList<Middleware>();
    public onConnectionReset: null | (() => void) = null;

    constructor(
        private hubUrl: string, 
        private token: string,
        private sseClient: SseClient = null,
        private gazeRequestor: GazeRequestor = null,
    ) {
        if (this.gazeRequestor === null){
            this.gazeRequestor = new FetchGazeRequestor(this.hubUrl, this.token);
        }

        if (this.sseClient === null){
            this.sseClient = new BetterEventSource(`${this.hubUrl}/sse`, {
                'Authorization' : `Bearer ${this.token}`
            });
        }
    }

    public connect(): Promise<GazeClient> {
        return new Promise(async res => { // eslint-disable-line no-async-promise-executor

            setTimeout(() => this.gazeRequestor.ping(), 500);

            this.sseClient.onmessage = async (message: {data: string}) => {
                try{
                    const data: {topic: string, payload: unknown} = JSON.parse(message.data);

                    if (this.middlewareList.first){
                        data.payload = await this.middlewareList.first.handle(data.payload);
                    }

                    this.subscriptions.getByTopic(data.topic).forEach(s => s.payloadCallback(data.payload));
                }catch(error){
                    console.error(error);
                }
            };

            this.sseClient.onopen = async () => {
                this.connected = true;
                await this.reconnect();
                res(this);
            };
        });
    }

    public async on<T>(topics: string | string[] | (() => string[]), payloadCallback: Callback<T>): Promise<{update: () => void}> {
        
        if (!this.connected) throw new Error('Gaze is not connected to a hub');

        if (typeof payloadCallback !== 'function'){
            throw new Error('Callback must be a function');
        }
        
        const topicsResolver = TopicsResolver.parse(topics);

        const subscription = this.subscriptions.create(payloadCallback);

        await this.update(subscription, topicsResolver);

        return {
            update: () => this.update(subscription, topicsResolver)
        }
    }

    private async update(subscription: Subscription, topicsResolver: TopicsResolver) {

        try{
            const newTopics = await topicsResolver.evaluate();

            const topicsToRemove = subscription.topicsToRemove(newTopics);
            const topicsToAdd = subscription.topicsToAdd(newTopics);

            if (topicsToRemove.length + topicsToAdd.length == 0) return;

            await subscription.queue.add(async() => {
                await this.gazeRequestor.unsubscribe(topicsToRemove);
                await this.gazeRequestor.subscribe(topicsToAdd);
            });

            subscription.topics = newTopics;
    
        }catch(error){
            return console.error(error);
        }
        
    }

    public addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void{
        const newMiddleware = new Middleware();
        newMiddleware.handler = handler;
        this.middlewareList.add(newMiddleware);
    }

    private async reconnect(): Promise<void>{
        if (this.subscriptions.getAll().length == 0) return;

        for(const subscription of this.subscriptions.getAll()){
            await this.gazeRequestor.subscribe(subscription.topics);
        }
        
        if (this.onConnectionReset) await this.onConnectionReset();
    }
}

export default GazeClient;
