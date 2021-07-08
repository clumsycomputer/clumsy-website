import Http from 'http'
import * as IO from 'io-ts'
import { Action } from 'redux'
import { EventChannel } from 'redux-saga'
import { SagaReturnType } from 'redux-saga/effects'
import WebSocket from 'ws'
import { PageModule } from '../../helpers/PageModule'

export interface ServerState {
  registeredClients: {
    [clientId: number]: {
      clientId: number
      clientRoute: string
      clientWebSocket: WebSocket
      pageModulePath: string
    }
  }
  pageModuleBundlerEventChannels: {
    [pageModulePath: string]: EventChannel<PageModuleBundlerEvent>
  }
  activePageModules: {
    [pageModulePath: string]: PageModule
  }
  pagePdfBuffers: {
    [tempPdfRoute: string]: Buffer
  }
}

export type ServerAction =
  | ClientBundleServedAction
  | ClientRegisteredAction
  | ClientUnregisteredAction
  | PageModuleBundlerCreatedAction
  | PageModuleUpdatedAction
  | PagePdfRenderedAction

export interface ClientBundleServedAction
  extends ActionBase<
    'clientBundleServed',
    {
      pageModulePath: string
    }
  > {}

export interface ClientRegisteredAction
  extends ActionBase<
    'clientRegistered',
    {
      clientId: number
      clientRoute: string
      clientWebSocket: WebSocket
      pageModulePath: string
    }
  > {}

export interface ClientUnregisteredAction
  extends ActionBase<
    'clientUnregistered',
    {
      clientId: number
    }
  > {}

export interface PageModuleBundlerCreatedAction
  extends ActionBase<
    'pageModuleBundlerCreated',
    {
      pageModulePath: string
      pageModuleBundlerEventChannel: EventChannel<PageModuleBundlerEvent>
    }
  > {}

export interface PageModuleUpdatedAction
  extends ActionBase<
    'pageModuleUpdated',
    {
      pageModulePath: string
      updatedPageModule: PageModule
    }
  > {}

export interface PagePdfRenderedAction
  extends ActionBase<
    'pagePdfRendered',
    {
      pagePdfBuffer: Buffer
      pagePdfRoute: string
    }
  > {}

export type ClientEvent =
  | ClientRequestEvent
  | ClientMessageEvent
  | ClientClosedEvent

export interface ClientRequestEvent
  extends EventBase<
    'clientRequest',
    {
      requestRoute: string
      requestResponse: Http.ServerResponse
    }
  > {}

export interface ClientMessageEvent
  extends EventBase<
    'clientMessage',
    {
      clientId: number
      clientWebSocket: WebSocket
      clientMessage: ClientMessage
    }
  > {}

export interface ClientClosedEvent
  extends EventBase<'clientClosed', { clientId: number }> {}

export type ClientMessage = RegisterClientMessage

export interface RegisterClientMessage
  extends MessageBase<
    'registerClient',
    {
      clientRoute: string
    }
  > {}

export const ClientMessageCodec = IO.exact(
  IO.type({
    messageType: IO.literal('registerClient'),
    messagePayload: IO.exact(
      IO.type({
        clientRoute: IO.string,
      })
    ),
  })
)

export type ServerMessage =
  | LoadPageHtmlContentMessage
  | LoadPagePdfContentMessage

export interface LoadPageHtmlContentMessage
  extends MessageBase<
    'loadPageHtmlContent',
    {
      pageBodyInnerHtmlString: string
      styleSheetString: string
    }
  > {}

export interface LoadPagePdfContentMessage
  extends MessageBase<
    'loadPagePdfContent',
    {
      pagePdfRoute: string
    }
  > {}

export const ServerMessageCodec = IO.union([
  IO.exact(
    IO.type({
      messageType: IO.literal('loadPageHtmlContent'),
      messagePayload: IO.exact(
        IO.type({
          pageBodyInnerHtmlString: IO.string,
          styleSheetString: IO.string,
        })
      ),
    })
  ),
  IO.exact(
    IO.type({
      messageType: IO.literal('loadPagePdfContent'),
      messagePayload: IO.exact(
        IO.type({
          pagePdfRoute: IO.string,
        })
      ),
    })
  ),
])

export type PageModuleBundlerEvent = EventBase<
  `pageModuleBundled@${string}`,
  { pageModuleBundle: string }
>

export interface ActionBase<
  ActionType extends string,
  ActionPayload extends object
> extends Action<ActionType> {
  actionPayload: ActionPayload
}

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
