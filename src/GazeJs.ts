import { Subscription } from "./Subscription";
import { EventData, PayloadCallback, TopicsCallback, OnConnectionResetFunction, SubscribeRequestData } from './Types';

class GazeJs {
    
    private connected = false;
    private token: null | string = null;
    private subscriptions: Subscription[] = [];
    private connectionResetCallback: OnConnectionResetFunction | null = null;

    constructor(
        private hubUrl: string, 
        private tokenUrl: string,
    ){ }

    connect(): Promise<GazeJs> {
        return new Promise(async (res) => { // eslint-disable-line no-async-promise-executor
            const req = await fetch(this.tokenUrl);
            this.token = (await req.json()).token;
            
            const SSE : EventSource = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);

            setTimeout(() => {
                fetch(`${this.hubUrl}/ping?token=${this.token}`);
            }, 500);

            SSE.onmessage = m => {
                const data : EventData = JSON.parse(m.data);
                this.subscriptions.find(s => s.callbackId == data.callbackId)?.payloadCallback(data.payload);
            };

            SSE.onopen = async () => {
                this.connected = true;

                if (this.subscriptions.length > 0) {
                    for(let i = 0; i < this.subscriptions.length; i++) {
                        const subscription = this.subscriptions[i];
                        await this.subscribeRequest("POST", {
                            callbackId: subscription.callbackId,
                            topics: subscription.topics
                        });
                    }

                    if (this.connectionResetCallback) await this.connectionResetCallback();
                }

                res(this);
            };
        });
    }

    onConnectionReset(callback: OnConnectionResetFunction): void {
        this.connectionResetCallback = callback;
    }

    async on<T>(topicsCallback: TopicsCallback, payloadCallback: PayloadCallback<T>): Promise<{update : () => void}> {
        if (!this.connected) throw new Error("Gaze is not connected to a hub");

        const subscription = new Subscription(this.generateCallbackId(), payloadCallback);
        this.subscriptions.push(subscription);

        await this.update(subscription, topicsCallback);

        return {
            update: () => this.update(subscription, topicsCallback)
        }
    }

    private async update(subscription : Subscription, topicsCallback: () => string[]) {
        let newTopics = await topicsCallback();
        newTopics = Array.from(new Set(newTopics));

        const topicsToRemove = subscription.topics.filter(t => !newTopics.includes(t));
        const topicsToAdd = newTopics.filter(t => !subscription.topics.includes(t));

        if (topicsToRemove.length + topicsToAdd.length == 0) return;

        await subscription.queue.add(async() => {
            if (topicsToRemove.length > 0){
                await this.subscribeRequest("DELETE", { topics: topicsToRemove });
            }
            if (topicsToAdd.length > 0){
                await this.subscribeRequest("POST", { 
                    callbackId: subscription.callbackId, 
                    topics: topicsToAdd 
                });
            }
        });

        subscription.topics = newTopics;
    }

    private async subscribeRequest(method: "POST" | "DELETE", data: SubscribeRequestData) {
        await fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    private generateCallbackId() : string {
        const UUID = Math.random().toString(36).substring(7);
        if (this.subscriptions.find(s => s.callbackId == UUID) == null){
            return UUID;
        }
        return this.generateCallbackId();
    }
}

export default GazeJs;