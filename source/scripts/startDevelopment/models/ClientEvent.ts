import Http from 'http'
import WebSocket from 'ws'
import { ClientMessage } from './ClientMessage'
import { EventBase } from '../helpers/types'

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
