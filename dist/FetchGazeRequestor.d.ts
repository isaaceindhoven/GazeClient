/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */
declare class FetchGazeRequestor {
    private hubUrl;
    private token;
    constructor(hubUrl: string, token: string);
    ping(): Promise<void>;
    subscribe(topics: string[]): Promise<void>;
    unsubscribe(topics: string[]): Promise<void>;
    private subscribeRequest;
}
export { FetchGazeRequestor };
