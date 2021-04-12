import { SubscribeRequestData } from './Types';

class GazeRequestor {

    private token: null | string = null;

    constructor(private hubUrl: string, private tokenResolver: string | (() => string) | Promise<string>){
        
    }

    public async getToken(): Promise<void> {
        const tokenUrl = await this.resolveTokenUrl();
        const req = await fetch(tokenUrl);
        this.token = encodeURIComponent((await req.json()).token);
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

    private async resolveTokenUrl(): Promise<string> {
        if (typeof this.tokenResolver === "string"){
            return this.tokenResolver;
        }

        if (typeof this.tokenResolver === "function"){
            return await this.tokenResolver();
        }

        if (typeof this.tokenResolver === "object"){
            return await Promise.resolve(this.tokenResolver);
        }

        throw new Error("TokenUrl must be a string or a valid resolver");
    }
}

export { GazeRequestor };