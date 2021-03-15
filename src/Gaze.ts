

class Gaze {
    
    private connected: boolean = false;
    private SSE: null | EventSource = null;
    private token: null | string = null;
    private callbacks: {callbackId : string, callback: CallableFunction}[] = [];

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

    getHubUrl(): string {
        return this.hubUrl;
    }

    removeCallback(id: string) {

    }

    async on<T>( topicsCallback: () => string[], callback: (t: T) => void ) {
        if (!this.connected){
            throw new Error("Gaze is not connected to a hub");
        }
        
        // TODO: unique id generator
        let callbackId = this.callbacks.length.toString();

        this.callbacks.push({callbackId, callback});
        return new GazeSub(this, callbackId, topicsCallback);
    }
}

export default Gaze