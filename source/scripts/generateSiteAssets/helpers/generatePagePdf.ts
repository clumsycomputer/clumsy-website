import FileSystem from 'fs/promises'
import Path from 'path'
import { generatePageHtml, GeneratePageHtmlApi } from './generatePageHtml'
import Playwright from 'playwright'
import { renderPagePdfToBuffer } from '../../helpers/renderPagePdfToBuffer'

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
  const pageHtmlString = await FileSystem.readFile(
    absolutePathHtmlFile,
    'utf-8'
  )
  const pagePdfBuffer = await renderPagePdfToBuffer({
    pageHtmlString,
  })
  await FileSystem.writeFile(
    Path.join(absolutePathPdfDirectory, `${pdfFileName}.pdf`),
    pagePdfBuffer
  )
}
