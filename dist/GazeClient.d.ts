import { GazeRequestor } from "./GazeRequestor";
import { PayloadCallback, OnConnectionResetFunction } from './Types';
declare class GazeClient {
    private connected;
    private subscriptions;
    private connectionResetCallback;
    private middlewareList;
    gazeRequestor: GazeRequestor;
    constructor(hubUrl: string, token: string);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: PayloadCallback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void;
    private reconnect;
    onConnectionReset(callback: OnConnectionResetFunction): void;
}
export default GazeClient;
