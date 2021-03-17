import { Subscription } from "./Subscription";

class GazeJs {
    
    private connected: boolean = false;
    private SSE: null | EventSource = null;
    private token: null | string = null;
    private subscriptions: Subscription[] = [];

    constructor(
        private hubUrl: string, 
        private tokenUrl: string,
    ){ }

    async connect() : Promise<GazeJs> {

        return new Promise(async (resolve) => {

            let req = await fetch(this.tokenUrl);
            this.token = (await req.json()).token;
            
            this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);

            this.SSE.onmessage = m => {
                let data : any = JSON.parse(m.data);
                this.subscriptions.find(s => s.callbackId == data.callbackId)?.payloadCallback(data.payload);
            }

            this.SSE.onopen = () => {
                this.connected = true;
                resolve(this);
            }

        })
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

    private async subscribeRequest(method: "POST" | "DELETE", data: any){
        await fetch(`${this.hubUrl}/subscription`, {
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