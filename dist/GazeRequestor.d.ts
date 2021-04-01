import { SubscribeRequestData } from './Types';
declare class GazeRequestor {
    private hubUrl;
    private tokenUrl;
    private token;
    constructor(hubUrl: string, tokenUrl: string);
    getToken(): Promise<void>;
    ping(): Promise<void>;
    connect(): EventSource;
    subscibe(data: SubscribeRequestData): Promise<void>;
    unsubscibe(data: SubscribeRequestData): Promise<void>;
    private subscribeRequest;
}
export { GazeRequestor };
