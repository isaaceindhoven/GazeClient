interface GazeRequestor {
    ping(): void | Promise<void>;
    subscibe(topics: string[]): void | Promise<void>;
    unsubscibe(topics: string[]): void | Promise<void>;
}

export { GazeRequestor }