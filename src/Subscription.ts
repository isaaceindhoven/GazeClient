import { Queue } from "./Queue";
import { PayloadCallback } from "./Types";

class Subscription {
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(
        public callbackId: string,
        public payloadCallback: PayloadCallback<unknown>
    ) { }

    public topicsToRemove(newTopics: string[]): string[]{
        return this.topics.filter(t => !newTopics.includes(t));
    }

    public topicsToAdd(newTopics: string[]): string[]{
        return newTopics.filter(t => !this.topics.includes(t));
    }
}

class Subscriptions {
    private subscriptions: Subscription[] = [];

    public getById(callbackId: string): Subscription{
        return this.subscriptions.find(s => s.callbackId == callbackId);
    }

    public create<T>(payloadCallback: PayloadCallback<T>): Subscription{
        if (typeof payloadCallback !== "function"){
            throw new Error("Callback must be a function");
        }
        const subscription = new Subscription(this.generateCallbackId(), payloadCallback);
        this.subscriptions.push(subscription);
        return subscription;
    }

    private generateCallbackId() : string {
        const id = Math.random().toString(36).substring(7);
        if (this.subscriptions.find(s => s.callbackId == id) == null){
            return id;
        }
        return this.generateCallbackId();
    }

    public getAll(): Subscription[]{
        return this.subscriptions;
    }
}

export { Subscription, Subscriptions }