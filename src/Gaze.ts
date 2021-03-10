type fieldOperator = '==' | '!=' | '>=' | '<=' | '>' | '<' | 'in' | 'regex';

class Gaze {
    
    private connected: boolean = false;
    private SSE: null | EventSource = null;
    private token: null | string = null;
    private callbacks: {callbackId : number, callback: CallableFunction}[] = [];

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

    on<T>( topic: string, selector: [string, fieldOperator, any] | null, callback: (t: T) => void ){

        if (this.connected == false){
            throw new Error("Gaze is not connected to a hub");
        }
        
        // TODO: unique id generator
        let callbackId = this.callbacks.length;
        
        this.callbacks.push({callbackId, callback})

        let formatedSelector = null;
        if (selector != null) {
            formatedSelector = {
                'field' : selector[0],
                'operator' : selector[1],
                'value' : selector[2],
            }
        }

        fetch(`${this.hubUrl}/subscription`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                callbackId, 
                topic, 
                selector : formatedSelector
            })
        })
    }
}

export default Gaze