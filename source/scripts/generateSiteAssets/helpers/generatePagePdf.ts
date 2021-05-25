import FileSystem from 'fs/promises'
import Path from 'path'
import { generatePageHtml, GeneratePageHtmlApi } from './generatePageHtml'
import Playwright from 'playwright'

export interface GeneratePagePdfApi extends GeneratePageHtmlApi {
  absolutePathPdfDirectory: string
  pdfFileName: string
}

export async function generatePagePdf(api: GeneratePagePdfApi) {
  const {
    absolutePathHtmlFile,
    pageRoute,
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    absolutePathPdfDirectory,
    pdfFileName,
  } = api
  await generatePageHtml({
    absolutePathHtmlFile,
    pageRoute,
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
  })
  const playwrightBrowser = await Playwright.chromium.launch()
  const playwrightContext = await playwrightBrowser.newContext()
  const playwrightPage = await playwrightContext.newPage()
  const htmlPageContent = await FileSystem.readFile(
    absolutePathHtmlFile,
    'utf-8'
  )
  await playwrightPage.setContent(htmlPageContent)
  const bodyHandle = await playwrightPage.$('body')
  if (!bodyHandle) throw new Error('wtf?')
  const bodyBoundingBox = await bodyHandle.boundingBox()
  if (!bodyBoundingBox) throw new Error('wtf?')
  await playwrightPage.pdf({
    path: Path.join(absolutePathPdfDirectory, `${pdfFileName}.pdf`),
    printBackground: true,
    height: bodyBoundingBox.height + 1,
    width: 832,
  })
  await playwrightBrowser.close()
}
