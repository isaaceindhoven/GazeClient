import Queue from "./Queue";

export default class Subscription {
    
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(
        public callbackId: string,
        public payloadCallback: Function
    ){
        
    }
    
}