import { GazeRequestor } from "./GazeRequestor";
import { PayloadCallback, OnConnectionResetFunction } from './Types';
declare class GazeClient {
    private connected;
    private subscriptions;
    private connectionResetCallback;
    gazeRequestor: GazeRequestor;
    constructor(hubUrl: string, tokenResolver: string | (() => string) | Promise<string>);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: PayloadCallback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    private reconnect;
    onConnectionReset(callback: OnConnectionResetFunction): void;
}
export default GazeClient;
