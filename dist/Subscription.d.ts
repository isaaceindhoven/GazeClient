import { Queue } from "./Queue";
declare class Subscription {
    callbackId: string;
    payloadCallback: Function;
    topics: string[];
    queue: Queue;
    constructor(callbackId: string, payloadCallback: Function);
}
export { Subscription };
