import { Subscriptions, Subscription } from "./Subscription";
import { GazeRequestor } from "./GazeRequestor";
import { EventData, PayloadCallback, OnConnectionResetFunction } from './Types';
import { TopicsResolver } from "./TopicsResolver";
import { Middleware } from "./Middleware";
import { LinkedList } from "./LinkedList";

class GazeClient {
    
    private connected = false;
    private subscriptions: Subscriptions = new Subscriptions();
    private connectionResetCallback: OnConnectionResetFunction | null = null;
    private middlewareList = new LinkedList<Middleware>();
    public gazeRequestor: GazeRequestor = null;

    constructor(hubUrl: string, token: string) {
        this.gazeRequestor = new GazeRequestor(hubUrl, token);
    }

    connect(): Promise<GazeClient> {
        return new Promise(async res => { // eslint-disable-line no-async-promise-executor
            
            const SSE : EventSource = this.gazeRequestor.connect();

            setTimeout(() => this.gazeRequestor.ping(), 500);

            SSE.onmessage = async message => {
                try{
                    const data : EventData = JSON.parse(message.data);

                    if (this.middlewareList.first){
                        data.payload = await this.middlewareList.first.handle(data.payload);
                    }

                    this.subscriptions.getById(data.callbackId)?.payloadCallback(data.payload);
                }catch(error){
                    console.error(error);
                }
            };

            SSE.onopen = async () => {
                this.connected = true;
                await this.reconnect();
                res(this);
            };
        });
    }

    async on<T>(topics: string | string[] | (() => string[]), payloadCallback: PayloadCallback<T>): Promise<{update : () => void}> {
        
        if (!this.connected) throw new Error("Gaze is not connected to a hub");
        
        const topicsResolver = TopicsResolver.parse(topics);

        const subscription = this.subscriptions.create(payloadCallback);

        await this.update(subscription, topicsResolver);

        return {
            update: () => this.update(subscription, topicsResolver)
        }
    }

    private async update(subscription : Subscription, topicsResolver: TopicsResolver) {

        try{
            const newTopics = await topicsResolver.evaluate();

            const topicsToRemove = subscription.topicsToRemove(newTopics);
            const topicsToAdd = subscription.topicsToAdd(newTopics);

            if (topicsToRemove.length + topicsToAdd.length == 0) return;

            await subscription.queue.add(async() => {
                await this.gazeRequestor.unsubscibe({ topics: topicsToRemove });

                await this.gazeRequestor.subscibe({ 
                    callbackId: subscription.callbackId, 
                    topics: topicsToAdd 
                });
            });

            subscription.topics = newTopics;
    
        }catch(error){
            return console.error(error);
        }
        
    }

    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void ){
        const newMiddleware = new Middleware();
        newMiddleware.handler = handler;
        this.middlewareList.add(newMiddleware);
    }

    private async reconnect(){
        if (this.subscriptions.getAll().length > 0) {
            for(const subscription of this.subscriptions.getAll()){
                await this.gazeRequestor.subscibe({
                    callbackId: subscription.callbackId,
                    topics: subscription.topics
                });
            }

            if (this.connectionResetCallback) await this.connectionResetCallback();
        }
    }

    onConnectionReset(callback: OnConnectionResetFunction): void {
        this.connectionResetCallback = callback;
    }
}

export default GazeClient;