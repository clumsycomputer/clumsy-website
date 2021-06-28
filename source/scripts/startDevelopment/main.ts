import Dotenv from 'dotenv'
import Glob from 'glob'
import Http from 'http'
import MemoryFileSystem from 'memory-fs'
import Path from 'path'
import createCompiler from 'webpack'
import { decodeData } from '../helpers/decodeData'
import { getPageHtmlStringWithInlineStyles } from '../helpers/getPageHtmlStringWithInlineStyles'
import { importLocalModule } from '../helpers/importLocalModule'
import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
import { PageModule, PageModuleCodec } from '../helpers/PageModule'
import { renderPagePdfToBuffer } from '../helpers/renderPagePdfToBuffer'
import React from 'react'
import * as ReactJss from 'react-jss'
;(global as any)['react'] = React
;(global as any)['react-jss'] = ReactJss

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
const pathJssThemeModule = './source/siteTheme.ts'
const serverPort = 3000
main()

async function main() {
  const pageModulesPaths = Glob.sync(globPagesModule)
  const pageCompiler = createCompiler({
    mode: 'development',
    entry: pageModulesPaths,
    output: {
      globalObject: 'global',
      library: {
        name: 'currentPageModule',
        type: 'global',
      },
      filename: '[name].bundle.js',
      path: '/dist',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
      react: 'react',
      ['react-jss']: 'react-jss',
    },
  })
  pageCompiler.outputFileSystem = new MemoryFileSystem()
  pageCompiler.watch(
    {
      aggregateTimeout: 0,
    },
    (watchError, watchStats) => {
      console.log('built')
    }
  )
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
          pageCompiler.outputFileSystem.readFile(
            '/dist/bundle.js',
            async (readError, fileData) => {
              ;(() => eval(fileData?.toString() as string))()
              const targetPageModule = await decodeData<PageModule>({
                targetCodec: PageModuleCodec,
                inputData: (global as any)['currentPageModule'],
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
          )
        } else {
          requestResponse.statusCode = 404
          requestResponse.end()
        }
      }
    }
  )
  developmentServer.listen(serverPort)
}
