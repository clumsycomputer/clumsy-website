import Playwright from 'playwright'

export interface RenderPagePdfToBufferApi {
  pageHtmlString: string
}

export async function renderPagePdfToBuffer(api: RenderPagePdfToBufferApi) {
  const { pageHtmlString } = api
  const playwrightBrowser = await Playwright.chromium.launch()
  const playwrightContext = await playwrightBrowser.newContext()
  const playwrightPage = await playwrightContext.newPage()
  await playwrightPage.setContent(pageHtmlString)
  const bodyHandle = await playwrightPage.$('body')
  if (!bodyHandle) throw new Error('wtf?')
  const bodyBoundingBox = await bodyHandle.boundingBox()
  if (!bodyBoundingBox) throw new Error('wtf?')
  const pagePdfBuffer = await playwrightPage.pdf({
    printBackground: true,
    height: bodyBoundingBox.height + 1,
    width: 832,
  })
  await playwrightBrowser.close()
  return pagePdfBuffer
}
