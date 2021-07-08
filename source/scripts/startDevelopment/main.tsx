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
import { Action, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware, {
  buffers as SagaBuffer,
  eventChannel,
  TakeableChannel,
} from 'redux-saga'
import {
  call,
  fork,
  put,
  SagaReturnType,
  select,
  Tail,
  take,
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
import {
  BrandedReturnType,
  ChildValue,
  ClientBundleServedAction,
  ClientClosedEvent,
  ClientEvent,
  ClientMessageCodec,
  ClientMessageEvent,
  ClientRegisteredAction,
  ClientRequestEvent,
  ClientUnregisteredAction,
  EventBase,
  LoadPageHtmlContentMessage,
  LoadPagePdfContentMessage,
  PageModuleBundlerCreatedAction,
  PageModuleBundlerEvent,
  PageModuleUpdatedAction,
  PagePdfRenderedAction,
  PickChild,
  ServerAction,
  ServerState,
} from './helpers/types'
;(global as any)['react'] = React
;(global as any)['react-jss'] = ReactJss

const Effect = getTypedEffects<ServerState>()

const memoizedGeneratePageHtmlContent = memoizeSaga({
  baseSaga: generatePageHtmlContent,
  checkShouldRun: ({
    previousArgs: [previousApi],
    currentArgs: [currentApi],
  }) => previousApi.targetPageModule !== currentApi.targetPageModule,
})

const memoizedGeneratePagePdfContent = memoizeSaga({
  baseSaga: generatePagePdfContent,
  checkShouldRun: ({
    previousArgs: [previousApi],
    currentArgs: [currentApi],
  }) => previousApi.targetPageModule !== currentApi.targetPageModule,
})

function serverReducer(
  serverState = {
    registeredClients: {},
    pageModuleBundlerEventChannels: {},
    activePageModules: {},
    pagePdfBuffers: {},
  },
  someServerAction: ServerAction
): ServerState {
  switch (someServerAction.type) {
    case 'clientBundleServed':
      return serverState
    case 'clientRegistered':
      return handleClientRegistered(serverState, someServerAction.actionPayload)
    case 'clientUnregistered':
      return handleClientUnregistered(
        serverState,
        someServerAction.actionPayload
      )
    case 'pageModuleBundlerCreated':
      return handlePageModuleBundlerCreated(
        serverState,
        someServerAction.actionPayload
      )
    case 'pageModuleUpdated':
      return handlePageModuleUpdated(
        serverState,
        someServerAction.actionPayload
      )
    case 'pagePdfRendered':
      return handlePagePdfRendered(serverState, someServerAction.actionPayload)
    default:
      return serverState
  }
}

function handleClientRegistered(
  serverState: ServerState,
  actionPayload: ClientRegisteredAction['actionPayload']
): ServerState {
  const { clientId } = actionPayload
  return {
    ...serverState,
    registeredClients: {
      ...serverState.registeredClients,
      [clientId]: {
        ...actionPayload,
      },
    },
  }
}

function handleClientUnregistered(
  serverState: ServerState,
  actionPayload: ClientUnregisteredAction['actionPayload']
): ServerState {
  const { clientId } = actionPayload
  const nextRegisteredClients = {
    ...serverState.registeredClients,
  }
  delete nextRegisteredClients[clientId]
  return {
    ...serverState,
    registeredClients: nextRegisteredClients,
  }
}

function handlePageModuleBundlerCreated(
  serverState: ServerState,
  actionPayload: PageModuleBundlerCreatedAction['actionPayload']
) {
  const { pageModulePath, pageModuleBundlerEventChannel } = actionPayload
  const nextPageModuleBundlerEventChannels = {
    ...serverState.pageModuleBundlerEventChannels,
    [pageModulePath]: pageModuleBundlerEventChannel,
  }
  return {
    ...serverState,
    pageModuleBundlerEventChannels: nextPageModuleBundlerEventChannels,
  }
}

function handlePageModuleUpdated(
  serverState: ServerState,
  actionPayload: PageModuleUpdatedAction['actionPayload']
): ServerState {
  const { pageModulePath, updatedPageModule } = actionPayload
  return {
    ...serverState,
    activePageModules: {
      ...serverState.activePageModules,
      [pageModulePath]: updatedPageModule,
    },
  }
}

function handlePagePdfRendered(
  serverState: ServerState,
  actionPayload: PagePdfRenderedAction['actionPayload']
): ServerState {
  const { pagePdfRoute, pagePdfBuffer } = actionPayload
  return {
    ...serverState,
    pagePdfBuffers: {
      ...serverState.pagePdfBuffers,
      [pagePdfRoute]: pagePdfBuffer,
    },
  }
}

main()

function main() {
  console.log('starting server...')
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
  createStore<ServerState, ServerAction, { dispatch: unknown }, {}>(
    serverReducer,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(developmentServer, {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModulePath,
  })
}

interface DevelopmentServerApi {
  currentWorkingDirectoryAbsolutePath: string
  pageModuleGlob: string
  serverPort: number
  jssThemeModulePath: string
}

function* developmentServer(api: DevelopmentServerApi) {
  const {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModulePath,
  } = api
  const { jssThemeModule } = yield* Effect.call(importJssThemeModule, {
    currentWorkingDirectoryAbsolutePath,
    jssThemeModulePath,
  })
  const { playwrightBrowserContext } = yield* Effect.call(initializePlaywright)
  yield fork(clientSaga, {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModule,
    playwrightBrowserContext,
  })
  yield fork(pageBundlerSaga, {
    jssThemeModule,
    playwrightBrowserContext,
  })
}

interface ImportJssThemeModuleApi
  extends Pick<
    DevelopmentServerApi,
    'currentWorkingDirectoryAbsolutePath' | 'jssThemeModulePath'
  > {}

async function importJssThemeModule(api: ImportJssThemeModuleApi) {
  const { currentWorkingDirectoryAbsolutePath, jssThemeModulePath } = api
  const jssThemeModule = await importLocalModule<JssThemeModule>({
    currentWorkingDirectoryAbsolutePath,
    targetCodec: JssThemeModuleCodec,
    localModulePath: jssThemeModulePath,
  })
  return { jssThemeModule }
}

async function initializePlaywright() {
  const playwrightBrowser = await Playwright.chromium.launch()
  const playwrightBrowserContext = await playwrightBrowser.newContext()
  return { playwrightBrowserContext }
}

interface ClientSagaApi
  extends Pick<
      DevelopmentServerApi,
      'currentWorkingDirectoryAbsolutePath' | 'pageModuleGlob' | 'serverPort'
    >,
    BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright> {}

function* clientSaga(api: ClientSagaApi) {
  const {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModule,
    playwrightBrowserContext,
  } = api
  const { clientBundle } = yield* Effect.call(bundleClient)
  const { pageRouteToPageModulePathMap } = yield* Effect.call(
    mapPageRouteToPageModulePath,
    {
      currentWorkingDirectoryAbsolutePath,
      pageModulePaths: Glob.sync(pageModuleGlob),
    }
  )
  const { clientEventChannel } = getClientEventChannel({ serverPort })
  yield fork(clientEventHandler, {
    clientBundle,
    pageRouteToPageModulePathMap,
    clientEventChannel,
  })
  yield fork(clientRegisteredHandler, {
    jssThemeModule,
    playwrightBrowserContext,
  })
}

function bundleClient() {
  return new Promise<{ clientBundle: string }>((resolve) => {
    const clientBundler = createBundler({
      mode: 'development',
      devtool: false,
      entry: Path.resolve(__dirname, './client/App.tsx'),
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  configFile: Path.resolve(__dirname, './client/tsconfig.json'),
                },
              },
            ],
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
            resolve({ clientBundle })
          } else {
            throw new Error('wtf? clientBundle')
          }
        }
      )
      clientBundler.close(() => {})
    })
  })
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
    [pageRoute: string]: string
  }>((result, someAdjustedPageModule) => {
    result[someAdjustedPageModule.pageRoute] =
      someAdjustedPageModule.pageModulePath
    if (someAdjustedPageModule.generatePdf) {
      result[`/${someAdjustedPageModule.pdfFileName}.pdf`] =
        someAdjustedPageModule.pageModulePath
    }
    return result
  }, {})
  return { pageRouteToPageModulePathMap }
}

interface GetClientEventChannelApi extends Pick<ClientSagaApi, 'serverPort'> {}

function getClientEventChannel(api: GetClientEventChannelApi) {
  const { serverPort } = api
  const clientEventChannel = eventChannel<ClientEvent>((emitClientEvent) => {
    const httpServer = Http.createServer((someRequest, requestResponse) => {
      const requestRoute = someRequest.url?.replace(/\?.*/, '')
      if (requestRoute) {
        emitClientEvent({
          eventType: 'clientRequest',
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
      const clientId = Math.random()
      clientWebSocket.on('close', () => {
        emitClientEvent({
          eventType: 'clientClosed',
          eventPayload: {
            clientId,
          },
        })
      })
      clientWebSocket.on('message', async (clientMessageData: string) => {
        const clientMessage = await decodeData({
          inputData: JSON.parse(clientMessageData),
          targetCodec: ClientMessageCodec,
        })
        emitClientEvent({
          eventType: 'clientMessage',
          eventPayload: {
            clientId,
            clientWebSocket,
            clientMessage,
          },
        })
      })
    })
    httpServer.listen(serverPort, () => {
      console.log('server ready...')
    })
    return () => {}
  }, SagaBuffer.expanding(1))
  return { clientEventChannel }
}

interface ClientEventHandlerApi
  extends BrandedReturnType<typeof bundleClient>,
    BrandedReturnType<typeof mapPageRouteToPageModulePath>,
    BrandedReturnType<typeof getClientEventChannel> {}

function* clientEventHandler(api: ClientEventHandlerApi) {
  const { clientEventChannel, clientBundle, pageRouteToPageModulePathMap } = api
  while (true) {
    const clientEvent = yield* Effect.takeEvent(clientEventChannel)
    switch (clientEvent.eventType) {
      case 'clientRequest':
        yield* clientRequestHandler({
          clientBundle,
          pageRouteToPageModulePathMap,
          ...clientEvent.eventPayload,
        })
        break
      case 'clientMessage':
        yield* clientMessageHandler({
          pageRouteToPageModulePathMap,
          ...clientEvent.eventPayload,
        })
        break
      case 'clientClosed':
        yield* clientClosedHandler({
          ...clientEvent.eventPayload,
        })
        break
    }
  }
}

interface ClientRequestHandlerApi
  extends Pick<
      ClientEventHandlerApi,
      'clientBundle' | 'pageRouteToPageModulePathMap'
    >,
    PickChild<ClientRequestEvent, 'eventPayload'> {}

function* clientRequestHandler(api: ClientRequestHandlerApi) {
  const {
    pageRouteToPageModulePathMap,
    requestRoute,
    requestResponse,
    clientBundle,
  } = api
  const pageModulePath = pageRouteToPageModulePathMap[requestRoute]
  const pagePdfBuffer = yield* Effect.select(
    (serverState) => serverState['pagePdfBuffers'][requestRoute]
  )
  if (pageModulePath) {
    requestResponse.statusCode = 200
    requestResponse.setHeader('Content-Type', 'text/html')
    requestResponse.end(
      ReactDOMServer.renderToStaticMarkup(
        <html lang={'en'}>
          <head>
            <meta charSet={'utf-8'} />
          </head>
          <body>
            <script
              dangerouslySetInnerHTML={{
                __html: clientBundle,
              }}
            />
          </body>
        </html>
      )
    )
    yield put<ClientBundleServedAction>({
      type: 'clientBundleServed',
      actionPayload: {
        pageModulePath,
      },
    })
  } else if (pagePdfBuffer) {
    requestResponse.statusCode = 200
    requestResponse.setHeader('Content-Type', 'application/pdf')
    requestResponse.end(pagePdfBuffer)
  } else {
    requestResponse.statusCode = 400
    requestResponse.end()
  }
}

interface ClientMessageHandlerApi
  extends Pick<ClientEventHandlerApi, 'pageRouteToPageModulePathMap'>,
    PickChild<ClientMessageEvent, 'eventPayload'> {}

function* clientMessageHandler(api: ClientMessageHandlerApi) {
  const {
    clientMessage,
    pageRouteToPageModulePathMap,
    clientId,
    clientWebSocket,
  } = api
  switch (clientMessage.messageType) {
    case 'registerClient':
      const { clientRoute } = clientMessage.messagePayload
      const pageModulePath = pageRouteToPageModulePathMap[clientRoute]
      if (pageModulePath) {
        yield put<ClientRegisteredAction>({
          type: 'clientRegistered',
          actionPayload: {
            clientId,
            clientWebSocket,
            clientRoute,
            pageModulePath,
          },
        })
      } else {
        throw new Error('wtf? @clientRegistered/pageModulePath')
      }
      break
  }
}

interface ClientClosedHandlerApi
  extends PickChild<ClientClosedEvent, 'eventPayload'> {}

function* clientClosedHandler(api: ClientClosedHandlerApi) {
  const { clientId } = api
  yield put<ClientUnregisteredAction>({
    type: 'clientUnregistered',
    actionPayload: {
      clientId,
    },
  })
}

interface ClientRegisteredHandlerApi
  extends Pick<ClientSagaApi, 'jssThemeModule' | 'playwrightBrowserContext'> {}

function* clientRegisteredHandler(api: ClientRegisteredHandlerApi) {
  const { jssThemeModule, playwrightBrowserContext } = api
  while (true) {
    const clientRegisteredAction =
      yield* Effect.takeAction<ClientRegisteredAction>('clientRegistered')
    const { pageModulePath, clientRoute, clientWebSocket } =
      clientRegisteredAction.actionPayload
    const targetPageModule = yield* Effect.select(
      (serverState) => serverState['activePageModules'][pageModulePath]
    )
    if (targetPageModule) {
      const loadPageContentServerMessage = yield* clientRoute.endsWith('.pdf')
        ? memoizedGeneratePagePdfContent({
            jssThemeModule,
            playwrightBrowserContext,
            targetPageModule,
          })
        : memoizedGeneratePageHtmlContent({
            jssThemeModule,
            targetPageModule,
          })
      clientWebSocket.send(loadPageContentServerMessage)
    }
  }
}

interface PageBundlerSagaApi
  extends BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright> {}

function* pageBundlerSaga(api: PageBundlerSagaApi) {
  const { jssThemeModule, playwrightBrowserContext } = api
  while (true) {
    const { actionPayload } =
      yield* Effect.takeAction<ClientBundleServedAction>('clientBundleServed')
    const { pageModulePath } = actionPayload
    const targetPageModuleBundler = yield* Effect.select(
      (serverState) =>
        serverState.pageModuleBundlerEventChannels[pageModulePath]
    )
    if (!targetPageModuleBundler) {
      const { pageModuleBundlerEventChannel } =
        getPageModuleBundlerEventChannel({
          pageModulePath,
        })
      yield put<PageModuleBundlerCreatedAction>({
        type: 'pageModuleBundlerCreated',
        actionPayload: {
          pageModulePath,
          pageModuleBundlerEventChannel,
        },
      })
      yield fork(pageModuleUpdateHandler, {
        jssThemeModule,
        playwrightBrowserContext,
        pageModulePath,
        pageModuleBundlerEventChannel,
      })
    }
  }
}

interface GetPageModuleBundlerEventChannelApi {
  pageModulePath: string
}

function getPageModuleBundlerEventChannel(
  api: GetPageModuleBundlerEventChannelApi
) {
  const { pageModulePath } = api
  const pageModuleBundlerEventChannel = eventChannel<PageModuleBundlerEvent>(
    (emitPageModuleBundlerEvent) => {
      const bundleId = Math.random()
      const pageModuleBundler = createBundler({
        mode: 'development',
        entry: pageModulePath,
        output: {
          globalObject: 'global',
          library: {
            name: `pageModule@${pageModulePath}`,
            type: 'global',
          },
          filename: `${bundleId}.bundle.js`,
          path: '/dist',
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: [
                {
                  loader: 'ts-loader',
                  options: {
                    configFile: 'devPage.tsconfig.json',
                  },
                },
              ],
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
                    eventType: `pageModuleBundled@${pageModulePath}`,
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
    SagaBuffer.expanding(1)
  )
  return { pageModuleBundlerEventChannel }
}

interface PageModuleUpdateHandlerApi
  extends BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright>,
    BrandedReturnType<typeof getPageModuleBundlerEventChannel>,
    Pick<
      PickChild<ClientBundleServedAction, 'actionPayload'>,
      'pageModulePath'
    > {}

function* pageModuleUpdateHandler(api: PageModuleUpdateHandlerApi) {
  const {
    pageModuleBundlerEventChannel,
    pageModulePath,
    jssThemeModule,
    playwrightBrowserContext,
  } = api
  while (true) {
    const { eventPayload } = yield* Effect.takeEvent(
      pageModuleBundlerEventChannel
    )
    const { pageModuleBundle } = eventPayload
    const { targetPageModule } = yield* Effect.call(decodeTargetPageModule, {
      pageModulePath,
      pageModuleBundle,
    })
    yield put<PageModuleUpdatedAction>({
      type: 'pageModuleUpdated',
      actionPayload: {
        pageModulePath,
        updatedPageModule: targetPageModule,
      },
    })
    const serverState = yield* Effect.select((serverState) => serverState)
    const activeClients = getActiveClients({ pageModulePath, serverState })
    if (activeClients.htmlClients.length > 0) {
      const loadPageHtmlContentMessage = yield* memoizedGeneratePageHtmlContent(
        {
          targetPageModule,
          jssThemeModule,
        }
      )
      activeClients.htmlClients.forEach((someActiveHtmlClient) => {
        someActiveHtmlClient.clientWebSocket.send(loadPageHtmlContentMessage)
      })
    }
    if (activeClients.pdfClients.length > 0) {
      const loadPagePdfContentMessage = yield* memoizedGeneratePagePdfContent({
        jssThemeModule,
        playwrightBrowserContext,
        targetPageModule,
      })
      activeClients.pdfClients.forEach((someActivePdfClient) => {
        someActivePdfClient.clientWebSocket.send(loadPagePdfContentMessage)
      })
    }
  }
}

interface DecodePageModuleApi
  extends Pick<PageModuleUpdateHandlerApi, 'pageModulePath'>,
    Pick<
      PickChild<PageModuleBundlerEvent, 'eventPayload'>,
      'pageModuleBundle'
    > {}

async function decodeTargetPageModule(api: DecodePageModuleApi) {
  const { pageModuleBundle, pageModulePath } = api
  ;(() => eval(pageModuleBundle))()
  const targetPageModule = await decodeData<PageModule>({
    targetCodec: PageModuleCodec,
    inputData: (global as any)[`pageModule@${pageModulePath}`],
  })
  return { targetPageModule }
}

interface GetActiveClientsApi
  extends Pick<PageModuleUpdateHandlerApi, 'pageModulePath'> {
  serverState: ServerState
}

function getActiveClients(api: GetActiveClientsApi) {
  const { serverState, pageModulePath } = api
  const { registeredClients } = serverState
  return Object.values(registeredClients).reduce<{
    htmlClients: Array<
      ChildValue<GetActiveClientsApi['serverState']['registeredClients']>
    >
    pdfClients: Array<
      ChildValue<GetActiveClientsApi['serverState']['registeredClients']>
    >
  }>(
    (result, someRegisteredClient) => {
      const registeredClientIsActive =
        pageModulePath === someRegisteredClient.pageModulePath
      const activeClientWantsPdf =
        registeredClientIsActive &&
        someRegisteredClient.clientRoute.endsWith('.pdf')
      if (activeClientWantsPdf) {
        result.pdfClients.push(someRegisteredClient)
      } else if (registeredClientIsActive) {
        result.htmlClients.push(someRegisteredClient)
      }
      return result
    },
    {
      htmlClients: [],
      pdfClients: [],
    }
  )
}

interface GeneratePageHtmlContentApi
  extends BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof decodeTargetPageModule> {}

function* generatePageHtmlContent(api: GeneratePageHtmlContentApi) {
  const { targetPageModule, jssThemeModule } = api
  const { PageContent } = targetPageModule.default
  const { pageBodyInnerHtmlString, styleSheetString } =
    getPageBodyInnerHtmlStringAndStyleSheetString({
      PageContent,
      sheetsRegistry: new SheetsRegistry(),
      jssTheme: jssThemeModule.default,
    })
  return JSON.stringify({
    messageType: 'loadPageHtmlContent',
    messagePayload: {
      pageBodyInnerHtmlString,
      styleSheetString,
    },
  } as LoadPageHtmlContentMessage)
}

interface GeneratePagePdfContentApi
  extends BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright>,
    BrandedReturnType<typeof decodeTargetPageModule> {}

function* generatePagePdfContent(api: GeneratePagePdfContentApi) {
  const { targetPageModule, jssThemeModule, playwrightBrowserContext } = api
  const { PageContent, htmlTitle, htmlDescription, pdfFileName } =
    targetPageModule.default
  const pageHtmlString = getPageHtmlStringWithInlineStyles({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme: {
      ...jssThemeModule.default,
      pdfMode: true,
    },
  })
  const { pagePdfBuffer } = yield* Effect.call(renderPagePdf, {
    playwrightBrowserContext,
    pageHtmlString,
  })
  const newPagePdfRoute = `/tempPdf/${pdfFileName}.${Math.random()}.pdf`
  yield put<PagePdfRenderedAction>({
    type: 'pagePdfRendered',
    actionPayload: {
      pagePdfBuffer,
      pagePdfRoute: newPagePdfRoute,
    },
  })
  return JSON.stringify({
    messageType: 'loadPagePdfContent',
    messagePayload: {
      pagePdfRoute: newPagePdfRoute,
    },
  } as LoadPagePdfContentMessage)
}

interface RenderPagePdfApi
  extends BrandedReturnType<typeof initializePlaywright> {
  pageHtmlString: ReturnType<typeof getPageHtmlStringWithInlineStyles>
}

async function renderPagePdf(api: RenderPagePdfApi) {
  const { playwrightBrowserContext, pageHtmlString } = api
  const playwrightPage = await playwrightBrowserContext.newPage()
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
  return { pagePdfBuffer }
}

type GetTypedEffectsApi = void

function getTypedEffects<SomeStoreState>(api: GetTypedEffectsApi) {
  return {
    call: function* <SomeFunction extends (...args: any[]) => any>(
      someFunction: SomeFunction,
      ...functionArgs: Parameters<SomeFunction>
    ): Generator<unknown, SagaReturnType<SomeFunction>> {
      return (yield call<SomeFunction>(
        someFunction,
        ...functionArgs
      )) as SagaReturnType<SomeFunction>
    },
    takeAction: function* <SomeAction extends Action<any>>(
      actionPattern: SomeAction['type']
    ) {
      return (yield take<SomeAction>(actionPattern)) as SomeAction
    },
    takeEvent: function* <SomeEvent extends EventBase<string, any>>(
      takeableChannel: TakeableChannel<SomeEvent>
    ) {
      return (yield take<SomeEvent>(takeableChannel)) as SomeEvent
    },
    select: function* <
      SomeFunction extends (state: SomeStoreState, ...args: any[]) => any
    >(
      storeSelector: SomeFunction,
      ...maybeArgs: Tail<Parameters<SomeFunction>>
    ) {
      return (yield select(storeSelector, ...maybeArgs)) as ReturnType<
        typeof storeSelector
      >
    },
  }
}

interface MemoizeSagaApi<SomeSaga extends (...args: any[]) => Generator> {
  baseSaga: SomeSaga
  checkShouldRun: (api: {
    previousArgs: Parameters<SomeSaga>
    currentArgs: Parameters<SomeSaga>
  }) => boolean
}

function memoizeSaga<SomeSaga extends (...args: any[]) => Generator>(
  api: MemoizeSagaApi<SomeSaga>
) {
  const { checkShouldRun, baseSaga } = api
  let previousState: {
    previousArgs: Parameters<SomeSaga>
    previousResult: SagaReturnType<SomeSaga>
  } | null = null
  return function* (...sagaArgs: Parameters<SomeSaga>) {
    if (
      !previousState ||
      checkShouldRun({
        previousArgs: previousState.previousArgs,
        currentArgs: sagaArgs,
      })
    ) {
      const sagaResult = yield* baseSaga(...sagaArgs)
      previousState = {
        previousArgs: sagaArgs,
        previousResult: sagaResult,
      }
      return sagaResult
    } else {
      return previousState.previousResult
    }
  } as SomeSaga
}
