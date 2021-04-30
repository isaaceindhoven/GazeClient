declare class TopicsResolver {
    private callback;
    constructor(callback: () => string[]);
    static parse(topics: string | string[] | (() => string[])): TopicsResolver;
    evaluate(): Promise<string[]>;
}
export { TopicsResolver };
