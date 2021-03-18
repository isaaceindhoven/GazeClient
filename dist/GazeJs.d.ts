declare class GazeJs {
    private hubUrl;
    private tokenUrl;
    private connected;
    private token;
    private subscriptions;
    constructor(hubUrl: string, tokenUrl: string);
    connect(): Promise<unknown>;
    on<T>(topicsCallback: () => string[], payloadCallback: (t: T) => void): Promise<{
        update: () => Promise<void>;
    }>;
    private update;
    private subscribeRequest;
    private generateCallbackId;
}
export default GazeJs;
