/// <reference lib="DOM" />
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const appContainer = document.createElement('div')
document.body.append(appContainer)
ReactDOM.render(<DevelopmentApp />, appContainer)

function DevelopmentApp() {
  const [pageContent, setPageContent] = useState<any>({})
  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:3000')
    webSocket.addEventListener('open', () => {
      webSocket.send(
        JSON.stringify({
          messageType: 'registerClient',
          messagePayload: {
            clientId: document.getElementById('clientId')?.innerText,
            clientRoute: window.location.pathname,
          },
        })
      )
    })
    webSocket.addEventListener('message', (messageEvent) => {
      try {
        const serverMessage = JSON.parse(messageEvent.data)
        switch (serverMessage.messageType) {
          case 'loadHtmlContent':
            setPageContent({
              contentType: 'text/html',
              contentData: serverMessage.messagePayload,
            })
            break
          case 'loadPdfContent':
            setPageContent({
              contentType: 'application/pdf',
              contentData: serverMessage.messagePayload,
            })
            break
        }
      } catch (jsonParseError) {
        // todo
      }
    })
  }, [])
  return (
    <div>
      {pageContent.contentType === 'text/html' ? (
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: pageContent.contentData.styleSheetString,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: pageContent.contentData.pageBodyInnerHtmlString,
            }}
          />
        </>
      ) : pageContent.contentType === 'application/pdf' ? (
        <object
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
          }}
          type={'application/pdf'}
          data={pageContent.contentData.pagePdfRoute}
        />
      ) : null}
    </div>
  )
}
