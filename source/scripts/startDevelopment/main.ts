import Dotenv from 'dotenv'
import Glob from 'glob'
import Http from 'http'
import Path from 'path'
import { getPageHtmlStringWithInlineStyles } from '../helpers/getPageHtmlStringWithInlineStyles'
import { importLocalModule } from '../helpers/importLocalModule'
import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
import { PageModule, PageModuleCodec } from '../helpers/PageModule'
import { renderPagePdfToBuffer } from '../helpers/renderPagePdfToBuffer'

const absolutePathCurrentWorkingDirectory = process.cwd()
Dotenv.config({
  path: Path.join(
    absolutePathCurrentWorkingDirectory,
    process.env.NODE_ENV === 'production'
      ? './.env.production'
      : './.env.development'
  ),
})
const globPagesModule = './source/pages/**/*.page.tsx'
const pathJssThemeModule = './source/siteTheme'
const serverPort = 3000
main()

async function main() {
  const pageModulesPaths = Glob.sync(globPagesModule)
  const adjustedPageModules = await Promise.all(
    pageModulesPaths.map(async (somePageModulePath) => {
      const somePageModule = await importLocalModule<PageModule>({
        absolutePathCurrentWorkingDirectory,
        targetCodec: PageModuleCodec,
        localModulePath: somePageModulePath,
      })
      return {
        ...somePageModule.default,
        pageModulePath: somePageModulePath,
      }
    })
  )
  const pageRouteToPageModulePathMap = adjustedPageModules.reduce<{
    [pageRoute: string]: { pageModulePath: string } | undefined
  }>((result, someAdjustedPageModule) => {
    result[someAdjustedPageModule.pageRoute] = {
      pageModulePath: someAdjustedPageModule.pageModulePath,
    }
    if (someAdjustedPageModule.generatePdf) {
      result[`/${someAdjustedPageModule.pdfFileName}.pdf`] = {
        pageModulePath: someAdjustedPageModule.pageModulePath,
      }
    }
    return result
  }, {})
  const jssThemeModule = await importLocalModule<JssThemeModule>({
    absolutePathCurrentWorkingDirectory,
    targetCodec: JssThemeModuleCodec,
    localModulePath: pathJssThemeModule,
  })
  const developmentServer = Http.createServer(
    async (someRequest, requestResponse) => {
      if (someRequest.url) {
        const requestRoute = someRequest.url.replace(/\?.*/, '')
        const targetPageModulePath =
          pageRouteToPageModulePathMap[requestRoute]?.pageModulePath
        if (targetPageModulePath) {
          const targetModuleCacheId = require.resolve(
            Path.resolve(
              absolutePathCurrentWorkingDirectory,
              targetPageModulePath
            )
          )
          const cachedTargetModule = require.cache[targetModuleCacheId]
          if (cachedTargetModule) {
            decacheNodeModule({
              baseNodeModule: cachedTargetModule,
            })
          }
          const targetPageModule = await importLocalModule<PageModule>({
            absolutePathCurrentWorkingDirectory,
            targetCodec: PageModuleCodec,
            localModulePath: targetPageModulePath,
          })
          const { PageContent, htmlTitle, htmlDescription } =
            targetPageModule.default
          if (requestRoute.endsWith('.pdf')) {
            const pageHtmlString = getPageHtmlStringWithInlineStyles({
              PageContent,
              htmlTitle,
              htmlDescription,
              jssTheme: {
                ...jssThemeModule.default,
                pdfMode: true,
              },
            })
            const pagePdfBuffer = await renderPagePdfToBuffer({
              pageHtmlString,
            })
            requestResponse.statusCode = 200
            requestResponse.setHeader('Content-Type', 'application/pdf')
            requestResponse.end(pagePdfBuffer)
          } else {
            const pageHtmlString = getPageHtmlStringWithInlineStyles({
              PageContent,
              htmlTitle,
              htmlDescription,
              jssTheme: jssThemeModule.default,
            })
            requestResponse.statusCode = 200
            requestResponse.setHeader('Content-Type', 'text/html')
            requestResponse.end(pageHtmlString)
          }
        }
      }
    }
  )
  developmentServer.listen(serverPort)
}

interface DecacheNodeModuleApi {
  baseNodeModule: NodeJS.Module
}

function decacheNodeModule(api: DecacheNodeModuleApi) {
  const { baseNodeModule } = api
  if (!baseNodeModule.path.match('node_modules')) {
    baseNodeModule.children.forEach((someNodeModule) => {
      decacheNodeModule({
        baseNodeModule: someNodeModule,
      })
    })
    delete require.cache[baseNodeModule.id]
  }
}
