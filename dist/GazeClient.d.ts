import { Callback } from './Types';
import { GazeRequestor } from './GazeRequestor';
import { SseClient } from './SseClient';
declare class GazeClient {
    private hubUrl;
    private sseClient;
    private gazeRequestor;
    private connected;
    private subscriptions;
    private middlewareList;
    onConnectionReset: null | (() => void);
    constructor(hubUrl: string, sseClient?: SseClient, gazeRequestor?: GazeRequestor);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: Callback<T>): Promise<{
        update: () => void;
        destroy: () => void;
    }>;
    private update;
    private destroy;
    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void;
    authenticate(token: string): Promise<void>;
    private reconnect;
}
export default GazeClient;
