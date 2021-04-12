import { SubscribeRequestData } from './Types';

class GazeRequestor {
    constructor(private hubUrl: string, private token: string){
        
    }

    public async ping(): Promise<void>{
        await fetch(`${this.hubUrl}/ping?token=${this.token}`);
    }

    public connect(): EventSource{
        return new EventSource(`${this.hubUrl}/sse?token=${this.token}`);
    }

    public async subscibe(data: SubscribeRequestData): Promise<void>{
        await this.subscribeRequest("POST", data);
    }

    public async unsubscibe(data: SubscribeRequestData): Promise<void>{
        await this.subscribeRequest("DELETE", data);
    }

    private async subscribeRequest(method: "POST" | "DELETE", data: SubscribeRequestData): Promise<void> {
        
        if (data.topics.length == 0) return;

        await fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export { GazeRequestor };