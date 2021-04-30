import { LinkedListItem } from './LinkedList';
declare class Middleware implements LinkedListItem {
    next: null | Middleware;
    handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void;
    handle(payload: unknown): Promise<unknown>;
}
export { Middleware };
