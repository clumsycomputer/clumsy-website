/// <reference lib="DOM" />

const displayElement = document.createElement('iframe')
displayElement.setAttribute(
  'style',
  'position: absolute; left: 0; top: 0; width: 100vw; height: 100vh; border: none;'
)
displayElement.id = 'myFrame'
document.body.append(displayElement)
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
  const messageAction = JSON.parse(messageEvent.data)
  const iframeElement = document.getElementById('myFrame') as HTMLIFrameElement
  iframeElement.src =
    'data:text/html;charset=utf-8,' +
    escape(messageAction.messagePayload.pageHtmlString)
})
