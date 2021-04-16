declare type EventData = {
    topic: string;
    payload: unknown;
};
declare type SubscribeRequestData = {
    topics: string[];
};
declare type OnConnectionResetFunction = () => void;
declare type PayloadCallback<T> = (t: T) => void;
export { EventData, SubscribeRequestData, OnConnectionResetFunction, PayloadCallback };
