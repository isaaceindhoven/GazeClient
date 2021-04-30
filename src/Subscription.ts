import { Queue } from './Queue';
import { Callback } from './Types';

class Subscription {
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(public payloadCallback: Callback<unknown>) {

    }

    public topicsToRemove(newTopics: string[]): string[]{
        return this.topics.filter(t => !newTopics.includes(t));
    }

    public topicsToAdd(newTopics: string[]): string[]{
        return newTopics.filter(t => !this.topics.includes(t));
    }
}

class Subscriptions {
    private subscriptions: Subscription[] = [];

    public getByTopic(topic: string): Subscription[]{
        return this.subscriptions.filter(s => s.topics.includes(topic));
    }

    public create<T>(payloadCallback: Callback<T>): Subscription{
        const subscription = new Subscription(payloadCallback);
        this.subscriptions.push(subscription);
        return subscription;
    }

    public getAll(): Subscription[]{
        return this.subscriptions;
    }
}

export { Subscription, Subscriptions }
