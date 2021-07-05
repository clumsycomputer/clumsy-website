import Dotenv from 'dotenv'
import Glob from 'glob'
import Http from 'http'
import MemoryFileSystem from 'memory-fs'
import Path from 'path'
import Playwright from 'playwright'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import * as ReactJss from 'react-jss'
import { SheetsRegistry } from 'react-jss'
import { Action, AnyAction, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware, {
  buffers,
  EventChannel,
  eventChannel,
} from 'redux-saga'
import {
  ActionPattern,
  call,
  fork,
  put,
  SagaReturnType,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'
import createBundler from 'webpack'
import WebSocket from 'ws'
import { decodeData } from '../helpers/decodeData'
import {
  getPageBodyInnerHtmlStringAndStyleSheetString,
  getPageHtmlStringWithInlineStyles,
} from '../helpers/getPageHtmlStringWithInlineStyles'
import { importLocalModule } from '../helpers/importLocalModule'
import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
import { PageModule, PageModuleCodec } from '../helpers/PageModule'
;(global as any)['react'] = React
;(global as any)['react-jss'] = ReactJss

const Effects = {
  call: function* <SomeFunction extends (...args: any[]) => any>(
    someFunction: SomeFunction,
    ...functionArgs: Parameters<SomeFunction>
  ): Generator<unknown, SagaReturnType<SomeFunction>> {
    return (yield call<SomeFunction>(
      someFunction,
      ...functionArgs
    )) as SagaReturnType<SomeFunction>
  },
  take: function* <SomeAction extends Action<any>>(
    actionPattern: SomeAction['type']
  ) {
    return (yield take<SomeAction>(actionPattern)) as SomeAction
  },
}

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

interface InitializeDevelopmentServerApi {
  currentWorkingDirectoryAbsolutePath: string
  serverPort: number
  pageModuleGlob: string
  jssThemeModulePath: string
}

function* initializeDevelopmentServer(
  api: InitializeDevelopmentServerApi
): Generator {
  const {
    serverPort,
    pageModuleGlob,
    currentWorkingDirectoryAbsolutePath,
    jssThemeModulePath,
  } = api
  const pageRouteToPageModulePathMap = yield* Effects.call(
    mapPageRouteToPageModulePath,
    {
      currentWorkingDirectoryAbsolutePath,
      pageModulePaths: Glob.sync(pageModuleGlob),
    }
  )
  const clientBundle = yield* Effects.call(bundleClient)
  const jssThemeModule = yield* Effects.call(importJssThemeModule, {
    currentWorkingDirectoryAbsolutePath,
    jssThemeModulePath,
  })
  const playwrightContext = yield* Effects.call(initializePlaywright)
  const clientEventChannel = getClientEventChannel({ serverPort })
  yield takeEvery(clientEventChannel, handleClientEvent)
  yield takeEvery(
    'initializeClient',
    getInitializeClientHandler({
      pageRouteToPageModulePathMap,
      clientBundle,
      jssThemeModule,
      playwrightContext,
    })
  )
}

interface MapPageRouteToPageModulePathApi {
  currentWorkingDirectoryAbsolutePath: string
  pageModulePaths: string[]
}

async function mapPageRouteToPageModulePath(
  api: MapPageRouteToPageModulePathApi
) {
  const { pageModulePaths, currentWorkingDirectoryAbsolutePath } = api
  const adjustedPageModules = await Promise.all(
    pageModulePaths.map(async (somePageModulePath) => {
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
}

function bundleClient() {
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

interface ImportJssThemeModuleApi {
  currentWorkingDirectoryAbsolutePath: string
  jssThemeModulePath: string
}

function importJssThemeModule(api: ImportJssThemeModuleApi) {
  const { currentWorkingDirectoryAbsolutePath, jssThemeModulePath } = api
  return importLocalModule<JssThemeModule>({
    currentWorkingDirectoryAbsolutePath,
    targetCodec: JssThemeModuleCodec,
    localModulePath: jssThemeModulePath,
  })
}

async function initializePlaywright() {
  const playwrightBrowser = await Playwright.chromium.launch()
  const playwrightContext = await playwrightBrowser.newContext()
  return playwrightContext
}

type ClientEvent =
  | EventBase<
      'newPageRequest',
      {
        requestRoute: string
        requestResponse: Http.ServerResponse
      }
    >
  | EventBase<
      'clientMessage',
      {
        clientWebSocket: WebSocket
        clientMessage: any
      }
    >

interface GetClientEventChannelApi
  extends Pick<InitializeDevelopmentServerApi, 'serverPort'> {}

function getClientEventChannel(api: GetClientEventChannelApi) {
  const { serverPort } = api
  return eventChannel<ClientEvent>((emitClientEvent) => {
    const httpServer = Http.createServer((someRequest, requestResponse) => {
      const requestRoute = someRequest.url?.replace(/\?.*/, '')
      if (requestRoute) {
        emitClientEvent({
          eventType: 'newPageRequest',
          eventPayload: {
            requestResponse,
            requestRoute,
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
  }, buffers.expanding(1))
}

function* handleClientEvent(someClientEvent: ClientEvent) {
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
  }
}

interface GetPageModuleBundlerEventChannelApi {
  pageModulePath: string
  clientId: number
}

function getPageModuleBundlerEventChannel(
  api: GetPageModuleBundlerEventChannelApi
) {
  const { pageModulePath, clientId } = api
  return eventChannel<PageModuleBundlerEvent>((emitPageModuleBundlerEvent) => {
    const bundleId = Math.random()
    const pageModuleBundler = createBundler({
      mode: 'development',
      entry: pageModulePath,
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
  }, buffers.expanding(1))
}

interface GetInitializeClientHandlerApi {
  clientBundle: string
  pageRouteToPageModulePathMap: SagaReturnType<
    typeof mapPageRouteToPageModulePath
  >
  jssThemeModule: JssThemeModule
  playwrightContext: Playwright.BrowserContext
}

function getInitializeClientHandler(api: GetInitializeClientHandlerApi) {
  const {
    clientBundle,
    pageRouteToPageModulePathMap,
    jssThemeModule,
    playwrightContext,
  } = api
  return function* ({
    actionPayload,
  }: {
    type: 'initializeClient'
    actionPayload: any
  }) {
    const { requestResponse, requestRoute } = actionPayload
    const pageModulePath =
      pageRouteToPageModulePathMap[requestRoute]?.pageModulePath
    if (pageModulePath) {
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
      const pageModuleBundlerEventChannel = getPageModuleBundlerEventChannel({
        pageModulePath,
        clientId,
      })
      const clientRegisteredAction = yield* Effects.take<{
        type: string // `clientRegistered@<number>`
        actionPayload: { clientWebSocket: WebSocket }
      }>(`clientRegistered@${clientId}`)
      const { clientWebSocket } = clientRegisteredAction.actionPayload
      yield takeLatest(
        pageModuleBundlerEventChannel,
        getPageModuleBundlerEventHandler({
          jssThemeModule,
          playwrightContext,
          requestRoute,
          clientWebSocket,
          clientId,
        })
      )
    } else {
      requestResponse.statusCode = 404
      requestResponse.end()
    }
  }
}

type PageModuleBundlerEvent = EventBase<string, { pageModuleBundle: string }>

interface GetPageModuleBundlerEventHandlerApi {
  clientId: number
  requestRoute: string
  jssThemeModule: JssThemeModule
  playwrightContext: Playwright.BrowserContext
  clientWebSocket: WebSocket
}

function getPageModuleBundlerEventHandler(
  api: GetPageModuleBundlerEventHandlerApi
) {
  const {
    clientId,
    requestRoute,
    jssThemeModule,
    playwrightContext,
    clientWebSocket,
  } = api
  return function* ({ eventPayload }: PageModuleBundlerEvent) {
    const { pageModuleBundle } = eventPayload
    const { PageContent, htmlTitle, htmlDescription } = yield* Effects.call(
      decodePageModule,
      { pageModuleBundle, clientId }
    )
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
      const pagePdfBuffer = yield* Effects.call(renderPagePdf, {
        playwrightContext,
        pageHtmlString,
      })
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
  }
}

interface DecodePageModuleApi {
  pageModuleBundle: string
  clientId: number
}

async function decodePageModule(api: DecodePageModuleApi) {
  const { pageModuleBundle, clientId } = api
  ;(() => eval(pageModuleBundle))()
  const targetPageModule = await decodeData<PageModule>({
    targetCodec: PageModuleCodec,
    inputData: (global as any)[`pageModule@${clientId}`],
  })
  return targetPageModule.default
}

interface RenderPagePdfApi {
  playwrightContext: Playwright.BrowserContext
  pageHtmlString: string
}

async function renderPagePdf(api: RenderPagePdfApi) {
  const { playwrightContext, pageHtmlString } = api
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
}

interface EventBase<EventType extends string, EventPayload extends object> {
  eventType: EventType
  eventPayload: EventPayload
}
