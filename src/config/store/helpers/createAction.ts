import { Action } from 'redux'

export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction(type: string, payload?: any) {
  return payload
    ? { type, payload }
    : { type }
}

