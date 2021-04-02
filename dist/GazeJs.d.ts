import { GazeRequestor } from "./GazeRequestor";
import { PayloadCallback, OnConnectionResetFunction } from './Types';
declare class GazeJs {
    private connected;
    private subscriptions;
    private connectionResetCallback;
    gazeRequestor: GazeRequestor;
    constructor(hubUrl: string, tokenUrl: string);
    connect(): Promise<GazeJs>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: PayloadCallback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    private reconnect;
    onConnectionReset(callback: OnConnectionResetFunction): void;
}
export default GazeJs;
