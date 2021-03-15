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

    async on<T>( topics: string[], callback: (t: T) => void ) {

        if (this.connected == false){
            throw new Error("Gaze is not connected to a hub");
        }
        
        // TODO: unique id generator
        let callbackId = this.callbacks.length.toString();

        this.callbacks.push({callbackId, callback})

        await fetch(`${this.hubUrl}/subscription`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ callbackId, topics })
        })
    }
}

export default Gaze