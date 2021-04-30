import { LinkedListItem } from './LinkedList';

class Middleware implements LinkedListItem {
    public next: null | Middleware;

    public handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void;

    handle(payload: unknown): Promise<unknown>{
        return new Promise<unknown>((resolve) => {
            this.handler(payload, (newPayload) => {
                if (this.next) {
                    this.next.handle(newPayload).then(resolve);
                } else {
                    resolve(newPayload);
                }
            });
        })
    }
}

export { Middleware }
