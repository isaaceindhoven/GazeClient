type CallBack = { 
    callbackId : string, 
    payloadCallback: CallableFunction,
    isBusy: boolean
};

class Gaze {
    
    private connected: boolean = false;
    private SSE: null | EventSource = null;
    private token: null | string = null;
    private callbacks: CallBack[] = [];

    constructor(
        private hubUrl: string, 
        private tokenUrl: string,
    ){ }

    async connect() : Promise<Gaze> {

        return new Promise(async (resolve) => {

            let req = await fetch(this.tokenUrl);
            this.token = (await req.json()).token;
            
            this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);

            this.SSE.onmessage = m => {
                let data : any = JSON.parse(m.data);
                this.callbacks.find(c => c.callbackId == data.callbackId)?.callback(data.payload);
            }

            this.SSE.onopen = () => {
                this.connected = true;
                resolve(this);
            }

        })
    }

    async on<T>( topicsCallback: () => string[], payloadCallback: (t: T) => void ) {
        if (!this.connected){
            throw new Error("Gaze is not connected to a hub");
        }
        
        // TODO: unique id generator
        let callbackId = this.callbacks.length.toString();
        let topics = await topicsCallback();

        let callback: CallBack = { callbackId, payloadCallback, isBusy: false };

        this.callbacks.push(callback);

        await this.subscribeRequest(null, "POST", { callbackId, topics });

        let abortController: AbortController | null = null;

        return {
            "update" : async () => {

                if (callback.isBusy) return;

                callback.isBusy = true;

                if (abortController != null){
                    abortController.abort();
                }

                abortController = new AbortController();

                let newTopics = await topicsCallback();

                let topicsToRemove = topics.filter(t => !newTopics.includes(t));
                let topicsToAdd = newTopics.filter(t => !topics.includes(t));

                await this.subscribeRequest(abortController, "DELETE", { topics: topicsToRemove });

                await this.subscribeRequest(abortController, "POST", { callbackId, topics: topicsToAdd });

                topics = newTopics;

                callback.isBusy = false;
            }
        }
    }

    private subscribeRequest(abortController: AbortController | null, method: "POST" | "DELETE", data: any){
        return fetch(`${this.hubUrl}/subscription`, {
            method,
            signal: abortController == null ? null : abortController.signal,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export default Gaze