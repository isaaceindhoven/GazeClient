import { GazeRequestor } from "./GazeRequestor";

class FetchGazeRequestor implements GazeRequestor {
    private clientId: string;

    constructor(private hubUrl: string){
        
    }

    public setClientId(clientId: string): void {
        this.clientId = clientId;
    }

    public async subscribe(topics: string[]): Promise<void>{
        await this.subscribeRequest('POST', topics);
    }

    public async unsubscribe(topics: string[]): Promise<void>{
        await this.subscribeRequest('DELETE', topics);
    }

    public async authenticate(token: string): Promise<void> {
        const payload = {
            'id': this.clientId,
            token
        };

        await fetch(`${this.hubUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    public async unauthenticate(): Promise<void> {
        await fetch(`${this.hubUrl}/auth`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.clientId}`
            }
        });
    }

    private async subscribeRequest(method: 'POST' | 'DELETE', topics: string[]): Promise<void> {
        
        if (topics.length == 0) return;

        await fetch(`${this.hubUrl}/subscription`, {
            method,
            headers: {
                'Authorization': `Bearer ${this.clientId}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topics
            })
        });
    }
}

export { FetchGazeRequestor };
