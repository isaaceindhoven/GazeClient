interface GazeRequestor {
    ping(): void | Promise<void>;
    subscribe(topics: string[]): void | Promise<void>;
    unsubscribe(topics: string[]): void | Promise<void>;
}

export { GazeRequestor }
