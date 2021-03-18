import { Subscription } from "./Subscription";

class GazeJs {
    
    private connected: boolean = false;
    private token: null | string = null;
    private subscriptions: Subscription[] = [];

    constructor(
        private hubUrl: string, 
        private tokenUrl: string,
    ){ }

    connect() {

        return new Promise(async (res) => {

            let req = await fetch(this.tokenUrl);
            this.token = (await req.json()).token;
            
            let SSE : EventSource = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);

            SSE.onmessage = m => {
                let data : any = JSON.parse(m.data);
                this.subscriptions.find(s => s.callbackId == data.callbackId)?.payloadCallback(data.payload);
            }

            SSE.onopen = () => {
                this.connected = true;
                res(this);
            }

        });

        
    }

    async on<T>( topicsCallback: () => string[], payloadCallback: (t: T) => void ) {
        
        if (!this.connected) throw new Error("Gaze is not connected to a hub");

        let subscription = new Subscription(this.generateCallbackId(), payloadCallback);

        this.subscriptions.push(subscription);

        await this.update(subscription, topicsCallback);

        return {
            update: () => this.update(subscription, topicsCallback)
        }
    }

    private async update(subscription : Subscription, topicsCallback: () => string[]){
        let newTopics = await topicsCallback();
        newTopics = Array.from(new Set(newTopics));

        let topicsToRemove = subscription.topics.filter(t => !newTopics.includes(t));
        let topicsToAdd = newTopics.filter(t => !subscription.topics.includes(t));

        if (topicsToRemove.length + topicsToAdd.length == 0) return;

        subscription.queue.add(async() => {
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

    private subscribeRequest(method: "POST" | "DELETE", data: any){
        return fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    private generateCallbackId() : string{
        let UUID = Math.random().toString(36).substring(7);
        if (this.subscriptions.find(s => s.callbackId == UUID) == null){
            return UUID;
        }
        return this.generateCallbackId();
    }
}

export default GazeJs;