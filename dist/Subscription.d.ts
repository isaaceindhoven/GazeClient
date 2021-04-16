import { Queue } from "./Queue";
import { PayloadCallback } from "./Types";
declare class Subscription {
    callbackId: string;
    payloadCallback: PayloadCallback<unknown>;
    topics: string[];
    queue: Queue;
    constructor(callbackId: string, payloadCallback: PayloadCallback<unknown>);
    topicsToRemove(newTopics: string[]): string[];
    topicsToAdd(newTopics: string[]): string[];
}
declare class Subscriptions {
    private subscriptions;
    getByTopic(topic: string): Subscription[];
    create<T>(payloadCallback: PayloadCallback<T>): Subscription;
    private generateCallbackId;
    getAll(): Subscription[];
}
export { Subscription, Subscriptions };
