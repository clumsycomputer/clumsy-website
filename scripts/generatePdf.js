const Puppeteer = require('puppeteer')
const Http = require('http')
const handleClientRequest = require('serve-handler')

generatePdf()

async function generatePdf() {
  const buildPath = './build'
  const serverPort = 8080
  const server = await serveWebsite({ buildPath, serverPort })
  const browser = await Puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${serverPort}`)
  await page.pdf({
    printBackground: true,
    path: `${buildPath}/resume.pdf`,
  })
  await browser.close()
  server.close()
}

function serveWebsite({ buildPath, serverPort }) {
  return new Promise((resolve) => {
    const server = Http.createServer((clientRequest, serverResponse) => {
      return handleClientRequest(clientRequest, serverResponse, {
        public: buildPath,
      })
    })
    server.listen(serverPort, () => {
      resolve(server)
    })
  })
}
