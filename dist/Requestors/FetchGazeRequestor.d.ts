import { GazeRequestor } from "./GazeRequestor";
declare class FetchGazeRequestor implements GazeRequestor {
    private hubUrl;
    private clientId;
    constructor(hubUrl: string);
    setClientId(clientId: string): void;
    subscribe(topics: string[]): Promise<void>;
    unsubscribe(topics: string[]): Promise<void>;
    authenticate(token: string): Promise<void>;
    unauthenticate(): Promise<void>;
    private subscribeRequest;
}
export { FetchGazeRequestor };
