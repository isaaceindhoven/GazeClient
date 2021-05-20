import { Queue } from './Queue';
import { Callback } from './Types';
declare class Subscription {
    callback: Callback<unknown>;
    topics: string[];
    queue: Queue;
    constructor(callback: Callback<unknown>);
    getUnusedTopics(newTopics: string[]): string[];
}
export { Subscription };
