interface SseClient {
    onmessage: (data: {data: unknown}) => unknown;
    onopen: (ev: Event) => unknown;
}

export { SseClient }
