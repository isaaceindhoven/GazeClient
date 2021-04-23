import { Queue } from './Queue';
import { Callback } from './Types';
declare class Subscription {
    payloadCallback: Callback<unknown>;
    topics: string[];
    queue: Queue;
    constructor(payloadCallback: Callback<unknown>);
    topicsToRemove(newTopics: string[]): string[];
    topicsToAdd(newTopics: string[]): string[];
}
declare class Subscriptions {
    private subscriptions;
    getByTopic(topic: string): Subscription[];
    create<T>(payloadCallback: Callback<T>): Subscription;
    getAll(): Subscription[];
}
export { Subscription, Subscriptions };
