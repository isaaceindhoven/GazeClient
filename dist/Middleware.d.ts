/**
  *   Do not remove or alter the notices in this preamble.
  *   This software code regards ISAAC Standard Software.
  *   Copyright © 2021 ISAAC and/or its affiliates.
  *   www.isaac.nl All rights reserved. License grant and user rights and obligations
  *   according to applicable license agreement. Please contact sales@isaac.nl for
  *   questions regarding license and user rights.
  */
import { LinkedListItem } from './LinkedList';
declare class Middleware implements LinkedListItem {
    next: null | Middleware;
    handler: (payload: unknown, next: ((newPayload: unknown) => void)) => void;
    handle(payload: unknown): Promise<unknown>;
}
export { Middleware };
