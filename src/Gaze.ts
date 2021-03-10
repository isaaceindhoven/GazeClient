type supportedSelector = '==' | '!=' | '>=' | '<=' | '>' | '<' | 'in' | 'regex';

class GazeSelector{
    constructor(
        public field: string, 
        public operator: supportedSelector,
        public value: string,
    ){
        
    }

    public static parse(selector: string){
        let selectorArr : string[] = selector.split(" ");
        return new GazeSelector(
            selectorArr.shift()!,
            selectorArr.shift()! as supportedSelector,
            selectorArr.join(" ")
        );
    }
}

class Gaze {
    
    private connected: boolean = false;
    private SSE: null | EventSource = null;
    private token: null | string = null;

    constructor(
        private hubUrl: string, 
        private tokenUrl: string,
    ){ }

    async connect(){

        let req = await fetch(this.tokenUrl);
        this.token = (await req.json()).token;
        
        this.SSE = new EventSource(`${this.hubUrl}/sse?token=${this.token}`);

        this.SSE.onopen = () => this.connected = true;

        // this.SSE.onmessage = m => {
        //     let data = JSON.parse(m.data);
        //     let callback = this.callbacks.find(c => c.callbackId == data.callbackId);
        //     callback.handler(data.payload);
        // }

        return this;
    }

    on<T>( eventName: string, selectors: (string|GazeSelector)[], callback: (t: T) => void ){
        
        if (this.connected == false){
            throw new Error("Gaze is not connected to a hub");
        }
        
        console.log({eventName, selectors, callback });
    }
}

export default Gaze