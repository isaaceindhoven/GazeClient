import { PayloadCallback, TopicsCallback, OnConnectionResetFunction } from './Types';
declare class GazeJs {
    private connected;
    private subscriptions;
    private connectionResetCallback;
    private gazeRequestor;
    constructor(hubUrl: string, tokenUrl: string);
    connect(): Promise<GazeJs>;
    on<T>(topics: TopicsCallback | string | string[], payloadCallback: PayloadCallback<T>): Promise<{
        update: () => void;
    } | void>;
    private update;
    private reconnect;
    private parseTopics;
    private evaluateTopicsCallback;
    onConnectionReset(callback: OnConnectionResetFunction): void;
}
export default GazeJs;
