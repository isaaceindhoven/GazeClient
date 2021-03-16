declare class GazeJs {
    private hubUrl;
    private tokenUrl;
    private connected;
    private SSE;
    private token;
    private subscriptions;
    constructor(hubUrl: string, tokenUrl: string);
    connect(): Promise<GazeJs>;
    on<T>(topicsCallback: () => string[], payloadCallback: (t: T) => void): Promise<{
        update: () => Promise<void>;
    }>;
    private update;
    private subscribeRequest;
    private generateCallbackId;
}
export { GazeJs };
