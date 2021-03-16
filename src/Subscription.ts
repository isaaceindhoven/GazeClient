import { Queue } from "./Queue";

class Subscription {
    
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(
        public callbackId: string,
        public payloadCallback: Function
    ){
        
    }
    
}

export { Subscription }