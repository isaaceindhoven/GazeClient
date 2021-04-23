interface SseClient {
    onmessage: (this: EventSource, ev: MessageEvent<unknown>) => unknown;
    onopen: (this: EventSource, ev: Event) => unknown;
}

export { SseClient }
