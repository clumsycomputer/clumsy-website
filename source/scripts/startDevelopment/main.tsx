import Dotenv from 'dotenv'
import Glob from 'glob'
import Http from 'http'
import MemoryFileSystem from 'memory-fs'
import Path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as ReactJss from 'react-jss'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware, {
  buffers,
  EventChannel,
  eventChannel,
} from 'redux-saga'
import {
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import createBundler from 'webpack'
import WebSocket from 'ws'
import {
  getPageBodyInnerHtmlStringAndStyleSheetString,
  getPageHtmlStringWithInlineStyles,
} from '../helpers/getPageHtmlStringWithInlineStyles'
import { decodeData } from '../helpers/decodeData'
import { importLocalModule } from '../helpers/importLocalModule'
import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
import { PageModule, PageModuleCodec } from '../helpers/PageModule'
import { SheetsRegistry } from 'react-jss'
import Playwright from 'playwright'
;(global as any)['react'] = React
;(global as any)['react-jss'] = ReactJss

main()

function main() {
  const currentWorkingDirectoryAbsolutePath = process.cwd()
  Dotenv.config({
    path: Path.join(
      currentWorkingDirectoryAbsolutePath,
      process.env.NODE_ENV === 'production'
        ? './.env.production'
        : './.env.development'
    ),
  })
  const serverPort = 3000
  const pageModuleGlob = './source/pages/**/*.page.tsx'
  const jssThemeModulePath = './source/siteTheme.ts'
  const sagaMiddleware = createSagaMiddleware()
  createStore(() => null, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(initializeDevelopmentServer, {
    currentWorkingDirectoryAbsolutePath,
    serverPort,
    pageModuleGlob,
    jssThemeModulePath,
  })
}

function* initializeDevelopmentServer(api: any): Generator {
  const {
    serverPort,
    pageModuleGlob,
    currentWorkingDirectoryAbsolutePath,
    jssThemeModulePath,
  } = api
  const pageModulesPaths = Glob.sync(pageModuleGlob)
  const pageRouteToPageModulePathMap = (yield call(async () => {
    const adjustedPageModules = await Promise.all(
      pageModulesPaths.map(async (somePageModulePath) => {
        const somePageModule = await importLocalModule<PageModule>({
          currentWorkingDirectoryAbsolutePath,
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
    return pageRouteToPageModulePathMap
  })) as {
    [pageRoute: string]: {
      pageModulePath: string
    }
  }
  const clientBundle = (yield call(getClientBundle)) as string
  const jssThemeModule = (yield call(() =>
    importLocalModule<JssThemeModule>({
      currentWorkingDirectoryAbsolutePath: process.cwd(),
      targetCodec: JssThemeModuleCodec,
      localModulePath: jssThemeModulePath,
    })
  )) as JssThemeModule
  const playwrightContext = (yield call(async () => {
    const playwrightBrowser = await Playwright.chromium.launch()
    const playwrightContext = await playwrightBrowser.newContext()
    return playwrightContext
  })) as Playwright.BrowserContext
  const clientChannel = (yield eventChannel((emitClientEvent) => {
    const httpServer = Http.createServer((someRequest, requestResponse) => {
      const requestRoute = someRequest.url?.replace(/\?.*/, '')
      if (requestRoute) {
        emitClientEvent({
          eventType: 'newPageRequest',
          eventPayload: {
            requestResponse,
            requestRoute: someRequest.url?.replace(/\?.*/, ''),
          },
        })
      }
    })
    const webSocketServer = new WebSocket.Server({
      server: httpServer,
    })
    webSocketServer.on('connection', (clientWebSocket) => {
      clientWebSocket.on('message', (clientMessage: string) => {
        emitClientEvent({
          eventType: 'clientMessage',
          eventPayload: {
            clientWebSocket,
            clientMessage: JSON.parse(clientMessage),
          },
        })
      })
    })
    httpServer.listen(serverPort, () => {
      console.log('ready...')
    })
    return () => {}
  }, buffers.expanding(1))) as EventChannel<any>
  yield takeEvery(clientChannel, function* (someClientEvent) {
    switch (someClientEvent.eventType) {
      case 'newPageRequest':
        const { requestRoute, requestResponse } = someClientEvent.eventPayload
        yield put({
          type: 'initializeClient',
          actionPayload: {
            requestResponse,
            requestRoute,
          },
        })
        break
      case 'clientConnected':
        break
      case 'clientMessage':
        const { clientMessage, clientWebSocket } = someClientEvent.eventPayload
        switch (clientMessage.messageType) {
          case 'registerClient':
            const { clientId } = clientMessage.messagePayload
            yield put({
              type: `clientRegistered@${clientId}`,
              actionPayload: {
                clientWebSocket,
              },
            })
            break
        }
        break
      case 'clientClosed':
        break
    }
  })
  yield fork(function* () {
    while (true) {
      const { actionPayload } = yield take('initializeClient')
      const { requestResponse, requestRoute } = actionPayload
      const clientId = Math.random()
      requestResponse.statusCode = 200
      requestResponse.setHeader('Content-Type', 'text/html')
      requestResponse.end(
        ReactDOMServer.renderToStaticMarkup(
          <html lang={'en'}>
            <head>
              <meta charSet={'utf-8'} />
            </head>
            <body>
              <div id={'clientId'} style={{ display: 'none' }}>
                {clientId}
              </div>
              <script
                dangerouslySetInnerHTML={{
                  __html: clientBundle,
                }}
              />
            </body>
          </html>
        )
      )
      const pageModuleBundlerChannel = eventChannel(
        (emitPageModuleBundlerEvent) => {
          const bundleId = Math.random()
          const pageModuleBundler = createBundler({
            mode: 'development',
            entry: pageRouteToPageModulePathMap[requestRoute].pageModulePath,
            output: {
              globalObject: 'global',
              library: {
                name: `pageModule@${clientId}`,
                type: 'global',
              },
              filename: `${bundleId}.bundle.js`,
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
          pageModuleBundler.outputFileSystem = new MemoryFileSystem()
          pageModuleBundler.watch(
            { aggregateTimeout: 100 },
            (buildError, bundleStats) => {
              const minimalBundleStats = bundleStats?.toJson('minimal')
              console.log(bundleStats?.toString('errors-warnings'))
              if (minimalBundleStats?.errorsCount === 0) {
                pageModuleBundler.outputFileSystem.readFile(
                  `/dist/${bundleId}.bundle.js`,
                  (readError, pageModuleBundleData) => {
                    const pageModuleBundle = pageModuleBundleData?.toString()
                    if (pageModuleBundle) {
                      emitPageModuleBundlerEvent({
                        eventType: `pageModuleBundled@${clientId}`,
                        eventPayload: {
                          pageModuleBundle,
                        },
                      })
                    } else {
                      throw new Error('wtf? pageModuleBundle')
                    }
                  }
                )
              }
            }
          )
          return () => {}
        },
        buffers.expanding(1)
      ) as EventChannel<any>
      const clientRegisteredAction = yield take(`clientRegistered@${clientId}`)
      const { clientWebSocket } = clientRegisteredAction.actionPayload
      yield takeLatest(pageModuleBundlerChannel, function* ({ eventPayload }) {
        const { pageModuleBundle } = eventPayload
        const { generatePdf, PageContent, htmlTitle, htmlDescription } =
          (yield call(async () => {
            ;(() => eval(pageModuleBundle))()
            const targetPageModule = await decodeData<PageModule>({
              targetCodec: PageModuleCodec,
              inputData: (global as any)[`pageModule@${clientId}`],
            })
            return targetPageModule.default
          })) as PageModule['default']
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
          const pagePdfBuffer = (yield call(async () => {
            const playwrightPage = await playwrightContext.newPage()
            await playwrightPage.setContent(pageHtmlString)
            const bodyHandle = await playwrightPage.$('body')
            if (!bodyHandle) throw new Error('wtf? bodyHandle')
            const bodyBoundingBox = await bodyHandle.boundingBox()
            if (!bodyBoundingBox) throw new Error('wtf? bodyBoundingBox')
            const pagePdfBuffer = await playwrightPage.pdf({
              printBackground: true,
              height: bodyBoundingBox.height + 1,
              width: 832,
            })
            return pagePdfBuffer
          })) as Buffer
          clientWebSocket.send(pagePdfBuffer)
        } else {
          const { pageBodyInnerHtmlString, styleSheetString } =
            getPageBodyInnerHtmlStringAndStyleSheetString({
              PageContent,
              sheetsRegistry: new SheetsRegistry(),
              jssTheme: jssThemeModule.default,
            })
          clientWebSocket.send(
            JSON.stringify({
              messageType: 'loadHtmlContent',
              messagePayload: {
                pageBodyInnerHtmlString,
                styleSheetString,
              },
            })
          )
        }
      })
    }
  })
}

function getClientBundle() {
  return new Promise<string>((resolve) => {
    const clientBundler = createBundler({
      mode: 'development',
      devtool: false,
      entry: Path.resolve(__dirname, './client.tsx'),
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
      output: {
        path: '/dist',
        filename: 'client.bundle.js',
      },
    })
    clientBundler.outputFileSystem = new MemoryFileSystem()
    clientBundler.run(() => {
      clientBundler.outputFileSystem.readFile(
        '/dist/client.bundle.js',
        (readError, clientBundleData) => {
          const clientBundle = clientBundleData?.toString()
          if (clientBundle) {
            resolve(clientBundle)
          } else {
            throw new Error('wtf? clientBundle')
          }
        }
      )
      clientBundler.close(() => {})
    })
  })
}
