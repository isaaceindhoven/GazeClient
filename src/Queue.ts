/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */

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
