import Http from 'http'
import openUrl from 'open'

const serverPort = 3000
const developmentUrl = `http://localhost:${serverPort}`
const defaultDevelopmentBrowserName = 'Google Chrome'
const developmentServer = Http.createServer((someRequest, requestResponse) => {
  requestResponse.statusCode = 200
  requestResponse.setHeader('Content-Type', 'text/plain')
  requestResponse.end('Howdy')
})
developmentServer.listen(serverPort)
openUrl(developmentUrl, {
  app: {
    name: defaultDevelopmentBrowserName,
  },
})
