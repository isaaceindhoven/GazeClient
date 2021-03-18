declare class Queue {
    private queue;
    private isBusy;
    add(callback: Function): Promise<void>;
    private process;
}
export { Queue };
