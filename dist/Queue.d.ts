declare type QueueEntry = () => void;
declare class Queue {
    private queue;
    private isBusy;
    add(callback: QueueEntry): Promise<void>;
    private process;
}
export { Queue };
