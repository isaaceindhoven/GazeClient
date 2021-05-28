interface SseClient {
    onmessage: (data: {
        data: unknown;
    }) => unknown;
    onopen: (ev: Event) => unknown;
    close(): void;
}
export { SseClient };
