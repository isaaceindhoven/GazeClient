declare class FetchGazeRequestor {
    private hubUrl;
    private token;
    constructor(hubUrl: string, token: string);
    ping(): Promise<void>;
    subscribe(topics: string[]): Promise<void>;
    unsubscribe(topics: string[]): Promise<void>;
    private subscribeRequest;
}
export { FetchGazeRequestor };
