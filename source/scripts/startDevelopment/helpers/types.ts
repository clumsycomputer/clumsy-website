import { SagaReturnType } from 'redux-saga/effects'

export interface EventBase<
  EventType extends string,
  EventPayload extends object
> {
  eventType: EventType
  eventPayload: EventPayload
}

export interface MessageBase<
  MessageType extends string,
  MessagePayload extends object
> {
  messageType: MessageType
  messagePayload: MessagePayload
}

export type PickChild<
  SomeObject extends object,
  SomeKey extends keyof SomeObject
> = SomeObject[SomeKey]

export type BrandedReturnType<
  SomeFunction extends (...args: any[]) => object,
  SomeReturnKey extends keyof SagaReturnType<SomeFunction> = keyof SagaReturnType<SomeFunction>
> = Pick<SagaReturnType<SomeFunction>, SomeReturnKey>

export type ChildValue<SomeObject extends object> = SomeObject[keyof SomeObject]
