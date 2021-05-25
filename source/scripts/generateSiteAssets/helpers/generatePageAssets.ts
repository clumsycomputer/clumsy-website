import Path from 'path'
import { decodeData } from './decodeData'
import { generatePageHtml } from './generatePageHtml'
import { generatePagePdf } from './generatePagePdf'
import { GenerateSiteAssetsApi } from './generateSiteAssets'
import { PageModule, PageModuleCodec } from './PageModule'

export interface GeneratePageAssetsApi
  extends Pick<GenerateSiteAssetsApi, 'absolutePathCurrentWorkingDirectory'> {
  absolutePathOutputDirectory: string
  absolutePathTempPdfHtmlDirectory: string
  pageModulePath: string
  jssTheme: Jss.Theme
}

export async function generatePageAssets(api: GeneratePageAssetsApi) {
  const {
    absolutePathCurrentWorkingDirectory,
    pageModulePath,
    absolutePathOutputDirectory,
    jssTheme,
    absolutePathTempPdfHtmlDirectory,
  } = api
  const absolutePathPageModule = Path.resolve(
    absolutePathCurrentWorkingDirectory,
    pageModulePath
  )
  const pageModuleImport: unknown = await import(absolutePathPageModule)
  const pageModule = await decodeData<PageModule>({
    inputData: pageModuleImport,
    targetCodec: PageModuleCodec,
  })
  const {
    pageRoute,
    PageContent,
    htmlTitle,
    htmlDescription,
    pdfFileName,
    generatePdf,
  } = pageModule.default
  await generatePageHtml({
    jssTheme,
    pageRoute,
    PageContent,
    htmlTitle,
    htmlDescription,
    absolutePathHtmlFile: Path.join(
      absolutePathOutputDirectory,
      pageRoute,
      'index.html'
    ),
  })
  if (generatePdf) {
    await generatePagePdf({
      pageRoute,
      PageContent,
      htmlTitle,
      htmlDescription,
      pdfFileName,
      absolutePathHtmlFile: Path.join(
        absolutePathTempPdfHtmlDirectory,
        pageRoute,
        'index.html'
      ),
      absolutePathPdfDirectory: absolutePathOutputDirectory,
      jssTheme: {
        ...jssTheme,
        pdfMode: generatePdf,
      },
    })
  }
}
