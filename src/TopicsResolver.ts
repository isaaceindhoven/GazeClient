class TopicsResolver {

    constructor(private callback: () => string[]){

    }

    public static parse(topics: string | string[] | (() => string[])): TopicsResolver {

        if (Array.isArray(topics)){
            return new TopicsResolver(() => topics)
        }

        if (typeof topics === "string"){
            return new TopicsResolver(() => [topics])
        }

        if (typeof topics !== 'function'){
            throw new Error("Topic callback must be a function");
        }

        return new TopicsResolver(topics);
    }

    public async evaluate(): Promise<string[]>{
        let newTopics = await this.callback();

        if (!Array.isArray(newTopics)){
            throw new Error("Topic callback must return array");
        }

        newTopics = newTopics.filter((x, i, a) => a.indexOf(x) == i)

        newTopics = newTopics.filter(t => !!t); // filter empty values

        newTopics = newTopics.map(t => {
            if (typeof t !== "string"){
                console.warn(`Topic ${t} was not a string`);
                t = (t as string).toString();
            }
            return t;
        });

        return newTopics;
    }

}

export { TopicsResolver }