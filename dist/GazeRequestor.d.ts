declare class GazeRequestor {
    private hubUrl;
    private token;
    constructor(hubUrl: string, token: string);
    ping(): Promise<void>;
    connect(): EventSource;
    subscibe(topics: string[]): Promise<void>;
    unsubscibe(topics: string[]): Promise<void>;
    private subscribeRequest;
}
export { GazeRequestor };
