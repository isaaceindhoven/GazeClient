type EventData = {
    callbackId: string,
    payload: unknown
};

type SubscribeRequestData = {
    topics: string[],
    callbackId?: string
};

type OnConnectionResetFunction = () => void;
type TopicsCallback = () => string[];
type PayloadCallback<T> = (t: T) => void;

export {
    EventData,
    SubscribeRequestData,
    OnConnectionResetFunction,
    TopicsCallback,
    PayloadCallback
}