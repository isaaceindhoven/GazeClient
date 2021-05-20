interface GazeRequestor {
    setClientId(clientId: string): void;
    authenticate(token: string): void | Promise<void>;
    subscribe(topics: string[]): void | Promise<void>;
    unsubscribe(topics: string[]): void | Promise<void>;
}

export { GazeRequestor }
