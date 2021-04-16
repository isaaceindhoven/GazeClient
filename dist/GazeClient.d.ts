import { GazeRequestor } from "./GazeRequestor";
import { Callback } from './Types';
declare class GazeClient {
    private connected;
    private subscriptions;
    private middlewareList;
    onConnectionReset: null | (() => void);
    gazeRequestor: GazeRequestor;
    constructor(hubUrl: string, token: string);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: Callback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void;
    private reconnect;
}
export default GazeClient;
