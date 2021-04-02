import { Subscriptions, Subscription } from "./Subscription";
import { GazeRequestor } from "./GazeRequestor";
import { EventData, PayloadCallback, OnConnectionResetFunction } from './Types';
import { TopicsResolver } from "./TopicsResolver";

class GazeJs {
    
    private connected = false;
    private subscriptions: Subscriptions = new Subscriptions();
    private connectionResetCallback: OnConnectionResetFunction | null = null;
    public gazeRequestor: GazeRequestor = null;

    constructor(hubUrl: string, tokenUrl: string ){
        this.gazeRequestor = new GazeRequestor(hubUrl, tokenUrl);
    }

    connect(): Promise<GazeJs> {
        return new Promise(async res => { // eslint-disable-line no-async-promise-executor
            
            await this.gazeRequestor.getToken();
            
            const SSE : EventSource = this.gazeRequestor.connect();

            setTimeout(() => this.gazeRequestor.ping(), 500);

            SSE.onmessage = m => {
                try{
                    const data : EventData = JSON.parse(m.data);
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

export default GazeJs;