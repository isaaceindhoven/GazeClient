import { SubscribeRequestData } from './Types';
declare class GazeRequestor {
    private hubUrl;
    private tokenResolver;
    private token;
    constructor(hubUrl: string, tokenResolver: string | (() => string) | Promise<string>);
    getToken(): Promise<void>;
    ping(): Promise<void>;
    connect(): EventSource;
    subscibe(data: SubscribeRequestData): Promise<void>;
    unsubscibe(data: SubscribeRequestData): Promise<void>;
    private subscribeRequest;
    private resolveTokenUrl;
}
export { GazeRequestor };
