import Path from 'path'
import { importLocalModule } from '../../helpers/importLocalModule'
import { PageModule, PageModuleCodec } from '../../helpers/PageModule'
import { generatePageHtml } from './generatePageHtml'
import { generatePagePdf } from './generatePagePdf'
import { GenerateSiteAssetsApi } from './generateSiteAssets'

export interface GeneratePageAssetsApi
  extends Pick<GenerateSiteAssetsApi, 'currentWorkingDirectoryAbsolutePath'> {
  absolutePathOutputDirectory: string
  absolutePathTempPdfHtmlDirectory: string
  pageModulePath: string
  jssTheme: Jss.Theme
}

export async function generatePageAssets(api: GeneratePageAssetsApi) {
  const {
    currentWorkingDirectoryAbsolutePath,
    pageModulePath,
    absolutePathOutputDirectory,
    jssTheme,
    absolutePathTempPdfHtmlDirectory,
  } = api
  const pageModule = await importLocalModule<PageModule>({
    currentWorkingDirectoryAbsolutePath,
    targetCodec: PageModuleCodec,
    localModulePath: pageModulePath,
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
