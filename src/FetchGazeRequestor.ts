class FetchGazeRequestor {
    constructor(private hubUrl: string, private token: string){
        
    }

    public async ping(): Promise<void>{
        await fetch(`${this.hubUrl}/ping?token=${this.token}`);
    }

    public async subscibe(topics: string[]): Promise<void>{
        await this.subscribeRequest("POST", topics);
    }

    public async unsubscibe(topics: string[]): Promise<void>{
        await this.subscribeRequest("DELETE", topics);
    }

    private async subscribeRequest(method: "POST" | "DELETE", topics: string[]): Promise<void> {
        
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