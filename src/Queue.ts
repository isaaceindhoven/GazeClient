type QueueEntry = () => void;

class Queue {
    public queue: QueueEntry[] = [];
    private isBusy = false;

    public async add(callback: QueueEntry): Promise<void> {
        this.queue.push(callback);
        await this.process();
    }

    private async process(): Promise<void> {
        if (this.isBusy || this.queue.length == 0) return;

        this.isBusy = true;

        await this.queue[0]();
        this.queue.shift();

        this.isBusy = false;

        await this.process();
    }
}

export { Queue }
