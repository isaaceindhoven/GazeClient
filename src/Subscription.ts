import { Queue } from './Queue';
import { Callback } from './Types';

class Subscription {
    public topics : string[] = [];
    public queue : Queue = new Queue();

    constructor(public callback: Callback<unknown>) {

    }

    public getUnusedTopics(newTopics: string[]): string[]{
        return this.topics.filter(t => !newTopics.includes(t));
    }
}

export { Subscription }
