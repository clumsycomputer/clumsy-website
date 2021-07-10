import { MessageBase } from '../helpers/types'
import * as IO from 'io-ts'

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
