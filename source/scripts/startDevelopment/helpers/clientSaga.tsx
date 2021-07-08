import Glob from 'glob'
import Http from 'http'
import MemoryFileSystem from 'memory-fs'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { buffers as SagaBuffer, eventChannel } from 'redux-saga'
import { fork, put } from 'redux-saga/effects'
import createBundler from 'webpack'
import WebSocket from 'ws'
import { decodeData } from '../../helpers/decodeData'
import { importLocalModule } from '../../helpers/importLocalModule'
import { PageModule, PageModuleCodec } from '../../helpers/PageModule'
import { clientWebpackConfig } from '../client/webpack.config'
import {
  memoizedGeneratePageHtmlContent,
  memoizedGeneratePagePdfContent,
} from './generatePageContent'
import {
  importJssThemeModule,
  initializePlaywright,
  ServerSagaApi,
} from './serverSaga'
import { call, select, takeAction, takeEvent } from './typedEffects'
import {
  BrandedReturnType,
  ClientBundleServedAction,
  ClientClosedEvent,
  ClientEvent,
  ClientMessageCodec,
  ClientMessageEvent,
  ClientRegisteredAction,
  ClientRequestEvent,
  ClientUnregisteredAction,
  PickChild,
} from './types'

export interface ClientSagaApi
  extends Pick<
      ServerSagaApi,
      'currentWorkingDirectoryAbsolutePath' | 'pageModuleGlob' | 'serverPort'
    >,
    BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright> {}

export function* clientSaga(api: ClientSagaApi) {
  const {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModule,
    playwrightBrowserContext,
  } = api
  const { clientBundle } = yield* call(bundleClient)
  const { pageRouteToPageModulePathMap } = yield* call(
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
    const clientBundler = createBundler(clientWebpackConfig)
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
    const clientEvent = yield* takeEvent(clientEventChannel)
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
  const pagePdfBuffer = yield* select(
    (serverState) => serverState['pagePdfBuffers'][requestRoute]
  )
  if (pageModulePath) {
    requestResponse.statusCode = 200
    requestResponse.setHeader('Content-Type', 'text/html')
    requestResponse.end(
      ReactDomServer.renderToStaticMarkup(
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
    const clientRegisteredAction = yield* takeAction<ClientRegisteredAction>(
      'clientRegistered'
    )
    const { pageModulePath, clientRoute, clientWebSocket } =
      clientRegisteredAction.actionPayload
    const targetPageModule = yield* select(
      (serverState) => serverState['activePageModules'][pageModulePath]
    )
    if (targetPageModule) {
      const loadPageContentServerMessage = yield* clientRoute.endsWith('.pdf')
        ? memoizedGeneratePagePdfContent({
            jssThemeModule,
            playwrightBrowserContext,
            pageModule: targetPageModule,
          })
        : memoizedGeneratePageHtmlContent({
            jssThemeModule,
            pageModule: targetPageModule,
          })
      clientWebSocket.send(loadPageContentServerMessage)
    }
  }
}
