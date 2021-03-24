import { Queue } from "./Queue";
import { PayloadCallback } from "./Types";

class Subscription {
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(
        public callbackId: string,
        public payloadCallback: PayloadCallback<unknown>
    ) { }
}

export { Subscription }