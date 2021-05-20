import { Callback } from './Types';
import { Subscription } from './Subscription'

const flatten = <T>(arr) : T[] => arr.reduce((a, b) => a.concat(b), []);

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

    public getUnusedTopics(subscription: Subscription, newTopics: string[]): string[]{
        const topicsToRemove = subscription.getUnusedTopics(newTopics);
        const subscribedTopics = flatten(this.subscriptions.filter(s => s !== subscription).map(s => s.topics));
        return topicsToRemove.filter(t => !subscribedTopics.includes(t));
    }

    public getNewTopics(newTopics: string[]): string[]{
        const alreadySubscribedTopics = flatten(this.subscriptions.map(s => s.topics));
        return newTopics.filter(t => !alreadySubscribedTopics.includes(t));
    }

    public remove(subscription: Subscription): void{
        this.subscriptions = this.subscriptions.filter(s => s !== subscription);
    }
}

export { Subscriptions }
