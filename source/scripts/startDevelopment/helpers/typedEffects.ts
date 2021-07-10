import { Action } from 'redux'
import { TakeableChannel, Task } from 'redux-saga'
import {
  call as _call,
  fork as _fork,
  put as _put,
  SagaReturnType,
  select as _select,
  Tail,
  take as _take,
} from 'redux-saga/effects'
import { ServerAction } from '../models/ServerAction'
import { ServerState } from '../models/ServerState'
import { EventBase } from './types'

const typedEffects = getTypedEffects<ServerAction, ServerState>()

export const call = typedEffects.call
export const fork = typedEffects.fork
export const put = typedEffects.put
export const select = typedEffects.select
export const takeAction = typedEffects.takeAction
export const takeEvent = typedEffects.takeEvent

type GetTypedEffectsApi = void

function getTypedEffects<StoreAction extends Action, StoreState>(
  api: GetTypedEffectsApi
) {
  return {
    call: function* <SomeFunction extends (...args: any[]) => any>(
      someFunction: SomeFunction,
      ...functionArgs: Parameters<SomeFunction>
    ): Generator<unknown, SagaReturnType<SomeFunction>> {
      return (yield _call<SomeFunction>(
        someFunction,
        ...functionArgs
      )) as SagaReturnType<SomeFunction>
    },
    fork: function* <SomeFunction extends (...args: any[]) => any>(
      someFunction: SomeFunction,
      ...functionArgs: Parameters<SomeFunction>
    ) {
      return (yield _fork<SomeFunction>(someFunction, ...functionArgs)) as Task
    },
    put: function* <SomeStoreAction extends StoreAction>(
      someAction: SomeStoreAction
    ) {
      return (yield _put<SomeStoreAction>(someAction)) as void
    },
    select: function* <
      SomeFunction extends (state: StoreState, ...args: any[]) => any
    >(
      storeSelector: SomeFunction,
      ...selectorArgs: Tail<Parameters<SomeFunction>>
    ) {
      return (yield _select(storeSelector, ...selectorArgs)) as ReturnType<
        typeof storeSelector
      >
    },
    takeAction: function* <SomeAction extends Action<any>>(
      actionPattern: SomeAction['type']
    ) {
      return (yield _take<SomeAction>(actionPattern)) as SomeAction
    },
    takeEvent: function* <SomeEvent extends EventBase<string, any>>(
      takeableChannel: TakeableChannel<SomeEvent>
    ) {
      return (yield _take<SomeEvent>(takeableChannel)) as SomeEvent
    },
  }
}
