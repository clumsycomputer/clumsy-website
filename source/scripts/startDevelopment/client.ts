/// <reference lib="DOM" />

const webSocket = new WebSocket('ws://localhost:3000')
webSocket.addEventListener('open', () => {
  console.log('open')
})
webSocket.addEventListener('message', (messageEvent) => {
  console.log('message')
  const messageAction = JSON.parse(messageEvent.data)
  if (messageAction.type === 'clientRegistered') {
    webSocket.send(
      JSON.stringify({
        type: 'updateClientPath',
        payload: {
          id: messageAction.payload.id,
          clientPath: '/',
        },
      })
    )
  }
})
