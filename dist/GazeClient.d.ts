/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */
import { Callback } from './Types';
import { GazeRequestor } from './GazeRequestor';
import { SseClient } from './SseClient';
declare class GazeClient {
    private hubUrl;
    private token;
    private sseClient;
    private gazeRequestor;
    private connected;
    private subscriptions;
    private middlewareList;
    onConnectionReset: null | (() => void);
    constructor(hubUrl: string, token: string, sseClient?: SseClient, gazeRequestor?: GazeRequestor);
    connect(): Promise<GazeClient>;
    on<T>(topics: string | string[] | (() => string[]), payloadCallback: Callback<T>): Promise<{
        update: () => void;
    }>;
    private update;
    addMiddleware(handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void): void;
    private reconnect;
}
export default GazeClient;
