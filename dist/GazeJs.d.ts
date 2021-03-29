import { PayloadCallback, TopicsCallback, OnConnectionResetFunction } from './Types';
declare class GazeJs {
    private hubUrl;
    private tokenUrl;
    private connected;
    private token;
    private subscriptions;
    private connectionResetCallback;
    constructor(hubUrl: string, tokenUrl: string);
    connect(): Promise<GazeJs>;
    onConnectionReset(callback: OnConnectionResetFunction): void;
    on<T>(topicsCallback: TopicsCallback, payloadCallback: PayloadCallback<T>): Promise<{
        update: () => void;
    } | void>;
    private update;
    private subscribeRequest;
    private generateCallbackId;
}
export default GazeJs;
