import { MessageBase } from '../helpers/types'
import * as IO from 'io-ts'

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
