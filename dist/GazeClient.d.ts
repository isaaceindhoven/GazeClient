import { Callback } from './Types';
import { GazeRequestor } from './GazeRequestor';
import { SseClient } from './SseClient';
declare class GazeClient {
    private hubUrl;
    private token;
    private sseClient;
    private gazeRequestor;
    private connected;
    private subscriptions;
    private middlewareList;
    onConnectionReset: null | (() => void);
    constructor(hubUrl: string, token: string, sseClient?: SseClient, gazeRequestor?: GazeRequestor);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: Callback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void;
    private reconnect;
}
export default GazeClient;
