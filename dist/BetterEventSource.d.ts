import { SseClient } from './SseClient';
declare class BetterEventSource implements SseClient {
    private url;
    private headers;
    private retryInterval;
    onmessage: (data: {
        data: unknown;
    }) => unknown;
    onopen: (ev: Event) => unknown;
    constructor(url: string, headers?: {}, retryInterval?: number);
    private sleep;
    private init;
}
export { BetterEventSource };
