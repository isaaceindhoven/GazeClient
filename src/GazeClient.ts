import { Subscription } from './Subscription';
import { Subscriptions } from './Subscriptions';
import { FetchGazeRequestor } from './Requestors/FetchGazeRequestor';
import { Callback } from './Types';
import { TopicsResolver } from './TopicsResolver';
import { Middleware } from './Middleware/Middleware';
import { LinkedList } from './Middleware/LinkedList';
import { GazeRequestor } from './Requestors/GazeRequestor';
import { SseClient } from './SseClient';

class GazeClient {
    
    private connected = false;
    private subscriptions: Subscriptions = new Subscriptions();
    private middlewareList = new LinkedList<Middleware>();
    public onConnectionReset: null | (() => void) = null;

    constructor(
        private hubUrl: string,
        private sseClient: SseClient = null,
        private gazeRequestor: GazeRequestor = null,
    ) {
        if (this.gazeRequestor === null){
            this.gazeRequestor = new FetchGazeRequestor(this.hubUrl);
        }
    }

    public connect(): Promise<GazeClient> {
        return new Promise(res => {
            
            if (this.sseClient === null) {
                this.sseClient = new EventSource(`${this.hubUrl}/sse`);
            }

            this.sseClient.onmessage = async (message: {data: string}) => {
                try {
                    const data: {topic: string, payload: unknown} = JSON.parse(message.data);

                    if (data['id']) {
                        this.gazeRequestor.setClientId(data['id']);
                        return res(this);
                    }

                    if (this.middlewareList.first) {
                        data.payload = await this.middlewareList.first.handle(data.payload);
                    }

                    this.subscriptions
                        .getByTopic(data.topic)
                        .forEach(s => s.callback(data.payload));
                } catch(error) {
                    console.error(error);
                }
            };

            this.sseClient.onopen = async () => {
                this.connected = true;
                await this.reconnect();
            };
        });
    }

    public async on<T>(topics: string | string[] | (() => string[]), callback: Callback<T>): Promise<{update: () => void, destroy: () => void}> {
        
        if (!this.connected) throw new Error('Gaze is not connected to a hub');

        if (typeof callback !== 'function'){
            throw new Error('Callback must be a function');
        }
        
        const topicsResolver = TopicsResolver.parse(topics);

        const subscription = this.subscriptions.create(callback);

        await this.update(subscription, topicsResolver);

        return {
            update: () => this.update(subscription, topicsResolver),
            destroy: () => this.destroy(subscription)
        }
    }

    private async update(subscription: Subscription, topicsResolver: TopicsResolver) {

        try{

            const newTopics = await topicsResolver.evaluate();

            const topicsToRemove = this.subscriptions.getUnusedTopics(subscription, newTopics);
            const topicsToAdd = this.subscriptions.getNewTopics(newTopics);

            await subscription.queue.add(async() => {
                if (topicsToRemove.length > 0){
                    await this.gazeRequestor.unsubscribe(topicsToRemove);
                }

                if (topicsToAdd.length > 0){
                    await this.gazeRequestor.subscribe(topicsToAdd);
                }
            });

            subscription.topics = newTopics;

        }catch(error){
            return console.error(error);
        }
        
    }

    private async destroy(subscription: Subscription) {
        await this.update(subscription, new TopicsResolver(() => []));
        this.subscriptions.remove(subscription);
    }

    public addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void{
        const newMiddleware = new Middleware();
        newMiddleware.handler = handler;
        this.middlewareList.add(newMiddleware);
    }

    public async authenticate(token: string): Promise<void> {
        await this.gazeRequestor.authenticate(token);
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
