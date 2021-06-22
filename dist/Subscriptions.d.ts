import { Callback } from './Types';
import { Subscription } from './Subscription';
declare class Subscriptions {
    private subscriptions;
    getByTopic(topic: string): Subscription[];
    create<T>(payloadCallback: Callback<T>): Subscription;
    getAll(): Subscription[];
    getAllTopics(): string[];
    getUnusedTopics(subscription: Subscription, newTopics: string[]): string[];
    getNewTopics(newTopics: string[]): string[];
    remove(subscription: Subscription): void;
}
export { Subscriptions };
