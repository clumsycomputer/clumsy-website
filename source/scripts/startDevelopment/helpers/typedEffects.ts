import { Action } from 'redux'
import { TakeableChannel } from 'redux-saga'
import {
  call as _call,
  SagaReturnType,
  select as _select,
  Tail,
  take as _take,
} from 'redux-saga/effects'
import { EventBase, ServerState } from './types'

const typedEffects = getTypedEffects<ServerState>()

export const call = typedEffects.call
export const takeAction = typedEffects.takeAction
export const takeEvent = typedEffects.takeEvent
export const select = typedEffects.select

type GetTypedEffectsApi = void

function getTypedEffects<SomeStoreState>(api: GetTypedEffectsApi) {
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
    select: function* <
      SomeFunction extends (state: SomeStoreState, ...args: any[]) => any
    >(
      storeSelector: SomeFunction,
      ...maybeArgs: Tail<Parameters<SomeFunction>>
    ) {
      return (yield _select(storeSelector, ...maybeArgs)) as ReturnType<
        typeof storeSelector
      >
    },
  }
}
