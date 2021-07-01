/// <reference lib="DOM" />
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const appContainer = document.createElement('div')
document.body.append(appContainer)
ReactDOM.render(<DevelopmentApp />, appContainer)

function DevelopmentApp() {
  const [bodyContent, setBodyContent] = useState<any>({})
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
      const { messagePayload } = JSON.parse(messageEvent.data)
      setBodyContent(messagePayload)
    })
  })
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: bodyContent.styleSheetString,
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: bodyContent.pageBodyInnerHtmlString,
        }}
      />
    </div>
  )
}
