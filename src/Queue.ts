class Queue {
    private queue: Function[] = [];
    private isBusy: boolean = false;

    public async add(callback: Function){
        this.queue.push(callback);
        await this.process();
    }

    private async process(){
        if (this.isBusy || this.queue.length == 0) return;

        this.isBusy = true;

        await this.queue[0]();
        this.queue.shift();

        this.isBusy = false;

        await this.process();
    }
}

export { Queue }