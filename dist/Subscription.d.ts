import { Queue } from "./Queue";
import { PayloadCallback } from "./Types";
declare class Subscription {
    callbackId: string;
    payloadCallback: PayloadCallback<unknown>;
    topics: string[];
    queue: Queue;
    constructor(callbackId: string, payloadCallback: PayloadCallback<unknown>);
}
export { Subscription };
