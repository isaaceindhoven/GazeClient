/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */
import { Queue } from './Queue';
import { Callback } from './Types';
declare class Subscription {
    payloadCallback: Callback<unknown>;
    topics: string[];
    queue: Queue;
    constructor(payloadCallback: Callback<unknown>);
    topicsToRemove(newTopics: string[]): string[];
    topicsToAdd(newTopics: string[]): string[];
}
declare class Subscriptions {
    private subscriptions;
    getByTopic(topic: string): Subscription[];
    create<T>(payloadCallback: Callback<T>): Subscription;
    getAll(): Subscription[];
}
export { Subscription, Subscriptions };
