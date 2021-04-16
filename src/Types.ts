type EventData = {
    topic: string,
    payload: unknown
};

type SubscribeRequestData = {
    topics: string[]
};

type OnConnectionResetFunction = () => void;
type PayloadCallback<T> = (t: T) => void;

export {
    EventData,
    SubscribeRequestData,
    OnConnectionResetFunction,
    PayloadCallback
}

