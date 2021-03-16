declare class Queue {
    private queue;
    private isBusy;
    add(callback: Function): void;
    process(): Promise<void>;
}
export { Queue };
