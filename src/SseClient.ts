interface SseClient {
    onmessage: (this: EventSource, ev: MessageEvent<any>) => any;
    onopen: (this: EventSource, ev: Event) => any;
}

export { SseClient }