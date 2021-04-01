import { Subscriptions, Subscription } from "./Subscription";
import { GazeRequestor } from "./GazeRequestor";
import { EventData, PayloadCallback, TopicsCallback, OnConnectionResetFunction } from './Types';

class GazeJs {
    
    private connected = false;
    private subscriptions: Subscriptions = new Subscriptions();
    private connectionResetCallback: OnConnectionResetFunction | null = null;
    private gazeRequestor: GazeRequestor = null;

    constructor(hubUrl: string, tokenUrl: string ){
        this.gazeRequestor = new GazeRequestor(hubUrl, tokenUrl);
    }

    connect(): Promise<GazeJs> {
        return new Promise(async (res) => { // eslint-disable-line no-async-promise-executor
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

    async on<T>(topics: TopicsCallback | string | string[], payloadCallback: PayloadCallback<T>): Promise<{update : () => void} | void> {
        
        if (!this.connected) throw new Error("Gaze is not connected to a hub");
        
        const topicsCallback = this.parseTopics(topics);

        if (typeof topicsCallback !== 'function'){
            return console.error("Topic callback must be a function"); 
        }

        const subscription = this.subscriptions.create(payloadCallback);

        await this.update(subscription, topicsCallback);

        return {
            update: () => this.update(subscription, topicsCallback)
        }
    }

    private async update(subscription : Subscription, topicsCallback: TopicsCallback) {

        try{
            const newTopics = await this.evaluateTopicsCallback(topicsCallback);

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

    private parseTopics(topics: TopicsCallback | string | string[]): TopicsCallback{
        if (Array.isArray(topics)) return () => topics;
        if (typeof topics === "string") return () => [topics];

        return topics;
    }

    private async evaluateTopicsCallback(topicsCallback: TopicsCallback): Promise<string[]>{
        let newTopics = await topicsCallback();

        if (!Array.isArray(newTopics)){
            throw "Topic callback must return array";
        }

        newTopics = Array.from(new Set(newTopics));

        newTopics = newTopics.filter(t => !!t); // filter empty values
        
        newTopics = newTopics.map(t => {
            if (typeof t !== "string"){
                console.warn(`Topic ${t} was not a string`);
                t = (t as string).toString();
            }
            return t;
        });

        return newTopics;
    }

    onConnectionReset(callback: OnConnectionResetFunction): void {
        this.connectionResetCallback = callback;
    }
}

export default GazeJs;