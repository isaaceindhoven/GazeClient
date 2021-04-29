/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */

class FetchGazeRequestor {
    constructor(private hubUrl: string, private token: string){
        
    }

    public async ping(): Promise<void>{
        await fetch(`${this.hubUrl}/ping?token=${this.token}`);
    }

    public async subscribe(topics: string[]): Promise<void>{
        await this.subscribeRequest('POST', topics);
    }

    public async unsubscribe(topics: string[]): Promise<void>{
        await this.subscribeRequest('DELETE', topics);
    }

    private async subscribeRequest(method: 'POST' | 'DELETE', topics: string[]): Promise<void> {
        
        if (topics.length == 0) return;

        await fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topics
            })
        });
    }
}

export { FetchGazeRequestor };
