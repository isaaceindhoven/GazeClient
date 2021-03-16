export default class Queue {
    private queue: Function[] = [];
    private isBusy: boolean = false;

    public add(callback: Function){
        this.queue.push(callback);
        this.process();
    }

    public async process(){
        if (this.isBusy || this.queue.length == 0) return;

        this.isBusy = true;

        await this.queue[0]();
        this.queue.shift();

        this.isBusy = false;

        this.process();
    }
}