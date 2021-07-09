import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { decodeData } from '../../../helpers/decodeData'
import { RegisterClientMessage } from '../../models/ClientMessage'
import { ServerMessage, ServerMessageCodec } from '../../models/ServerMessage'

const appContainer = document.createElement('div')
document.body.append(appContainer)
ReactDOM.render(<DevelopmentApp />, appContainer)

function DevelopmentApp() {
  const [pageContent, setPageContent] = useState<JSX.Element | null>(null)
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:3000')
    webSocket.addEventListener('open', () => {
      webSocket.send(
        JSON.stringify({
          messageType: 'registerClient',
          messagePayload: {
            clientRoute: window.location.pathname,
          },
        } as RegisterClientMessage)
      )
    })
    webSocket.addEventListener(
      'message',
      getServerMessageHandler({ setPageContent })
    )
  }, [])
  return pageContent
}

interface GetServerMessageHandlerApi {
  setPageContent: Dispatch<SetStateAction<JSX.Element | null>>
}

function getServerMessageHandler(api: GetServerMessageHandlerApi) {
  const { setPageContent } = api
  return async (messageEvent: MessageEvent<any>) => {
    try {
      const serverMessage = await decodeData<ServerMessage>({
        inputData: JSON.parse(messageEvent.data),
        targetCodec: ServerMessageCodec,
      })
      switch (serverMessage.messageType) {
        case 'loadPageHtmlContent':
          const { styleSheetString, pageBodyInnerHtmlString } =
            serverMessage.messagePayload
          setPageContent(
            <>
              <style
                dangerouslySetInnerHTML={{
                  __html: styleSheetString,
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: pageBodyInnerHtmlString,
                }}
              />
            </>
          )
          break
        case 'loadPagePdfContent':
          const { pagePdfRoute } = serverMessage.messagePayload
          setPageContent(
            <object
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100vw',
                height: '100vh',
              }}
              type={'application/pdf'}
              data={pagePdfRoute}
            />
          )
          break
      }
    } catch (jsonParseError) {
      throw new Error('wtf? parsing server message')
    }
  }
}
