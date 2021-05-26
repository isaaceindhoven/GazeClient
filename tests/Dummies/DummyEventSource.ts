import { SseClient } from '../../src/SseClient';

class DummyEventSource implements SseClient {
    onmessage: any;
    onopen: any;
    close() {}
}

export { DummyEventSource }
