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
          },
        })
      )
    })
    webSocket.addEventListener('message', (messageEvent) => {
      try {
        const { messagePayload } = JSON.parse(messageEvent.data)
        setPageContent({
          contentType: 'html',
          contentData: messagePayload,
        })
      } catch (jsonParseError) {
        setPageContent({
          contentType: 'pdf',
          contentData: URL.createObjectURL(
            new Blob([messageEvent.data], {
              type: 'application/pdf',
            })
          ),
        })
      }
    })
  })
  return (
    <div>
      {pageContent.contentType === 'html' ? (
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
      ) : pageContent.contentType === 'pdf' ? (
        <object
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
          }}
          type={'application/pdf'}
          data={pageContent.contentData}
        />
      ) : null}
    </div>
  )
}
