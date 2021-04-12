import { SubscribeRequestData } from './Types';
declare class GazeRequestor {
    private hubUrl;
    private token;
    constructor(hubUrl: string, token: string);
    ping(): Promise<void>;
    connect(): EventSource;
    subscibe(data: SubscribeRequestData): Promise<void>;
    unsubscibe(data: SubscribeRequestData): Promise<void>;
    private subscribeRequest;
}
export { GazeRequestor };
