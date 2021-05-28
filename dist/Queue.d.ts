declare type QueueEntry = () => void;
declare class Queue {
    queue: QueueEntry[];
    private isBusy;
    add(callback: QueueEntry): Promise<void>;
    private process;
}
export { Queue };
