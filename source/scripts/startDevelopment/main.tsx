// import Dotenv from 'dotenv'
// import Glob from 'glob'
// import Http from 'http'
// import MemoryFileSystem from 'memory-fs'
// import Path from 'path'
// import createCompiler from 'webpack'
// import { decodeData } from '../helpers/decodeData'
// import { getPageHtmlStringWithInlineStyles } from '../helpers/getPageHtmlStringWithInlineStyles'
// import { importLocalModule } from '../helpers/importLocalModule'
// import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
// import { PageModule, PageModuleCodec } from '../helpers/PageModule'
// import { renderPagePdfToBuffer } from '../helpers/renderPagePdfToBuffer'
// import React from 'react'
// import * as ReactJss from 'react-jss'
// ;(global as any)['react'] = React
// ;(global as any)['react-jss'] = ReactJss

// const absolutePathCurrentWorkingDirectory = process.cwd()
// Dotenv.config({
//   path: Path.join(
//     absolutePathCurrentWorkingDirectory,
//     process.env.NODE_ENV === 'production'
//       ? './.env.production'
//       : './.env.development'
//   ),
// })
// const globPagesModule = './source/pages/**/*.page.tsx'
// const pathJssThemeModule = './source/siteTheme.ts'
// const serverPort = 3000
// main()

// async function main() {
//   const pageModulesPaths = Glob.sync(globPagesModule)
//   const pageCompiler = createCompiler({
//     mode: 'development',
//     entry: pageModulesPaths,
//     output: {
//       globalObject: 'global',
//       library: {
//         name: 'currentPageModule',
//         type: 'global',
//       },
//       filename: '[name].bundle.js',
//       path: '/dist',
//     },
// module: {
//   rules: [
//     {
//       test: /\.tsx?$/,
//       use: 'ts-loader',
//       exclude: /node_modules/,
//     },
//   ],
// },
// resolve: {
//   extensions: ['.tsx', '.ts', '.js'],
// },
//     externals: {
//       react: 'react',
//       ['react-jss']: 'react-jss',
//     },
//   })
//   pageCompiler.outputFileSystem = new MemoryFileSystem()
//   pageCompiler.watch(
//     {
//       aggregateTimeout: 0,
//     },
//     (watchError, watchStats) => {
//       console.log('built')
//     }
//   )
//   const adjustedPageModules = await Promise.all(
//     pageModulesPaths.map(async (somePageModulePath) => {
//       const somePageModule = await importLocalModule<PageModule>({
//         absolutePathCurrentWorkingDirectory,
//         targetCodec: PageModuleCodec,
//         localModulePath: somePageModulePath,
//       })
//       return {
//         ...somePageModule.default,
//         pageModulePath: somePageModulePath,
//       }
//     })
//   )
//   const pageRouteToPageModulePathMap = adjustedPageModules.reduce<{
//     [pageRoute: string]: { pageModulePath: string } | undefined
//   }>((result, someAdjustedPageModule) => {
//     result[someAdjustedPageModule.pageRoute] = {
//       pageModulePath: someAdjustedPageModule.pageModulePath,
//     }
//     if (someAdjustedPageModule.generatePdf) {
//       result[`/${someAdjustedPageModule.pdfFileName}.pdf`] = {
//         pageModulePath: someAdjustedPageModule.pageModulePath,
//       }
//     }
//     return result
//   }, {})
// const jssThemeModule = await importLocalModule<JssThemeModule>({
//   absolutePathCurrentWorkingDirectory,
//   targetCodec: JssThemeModuleCodec,
//   localModulePath: pathJssThemeModule,
// })
//   const developmentServer = Http.createServer(
//     async (someRequest, requestResponse) => {
//       if (someRequest.url) {
// const requestRoute = someRequest.url.replace(/\?.*/, '')
//         const targetPageModulePath =
//           pageRouteToPageModulePathMap[requestRoute]?.pageModulePath
//         if (targetPageModulePath) {
//           pageCompiler.outputFileSystem.readFile(
//             '/dist/bundle.js',
//             async (readError, fileData) => {
// ;(() => eval(fileData?.toString() as string))()
// const targetPageModule = await decodeData<PageModule>({
//   targetCodec: PageModuleCodec,
//   inputData: (global as any)['currentPageModule'],
// })
// const { PageContent, htmlTitle, htmlDescription } =
//   targetPageModule.default
//               if (requestRoute.endsWith('.pdf')) {
//                 const pageHtmlString = getPageHtmlStringWithInlineStyles({
//                   PageContent,
//                   htmlTitle,
//                   htmlDescription,
//                   jssTheme: {
//                     ...jssThemeModule.default,
//                     pdfMode: true,
//                   },
//                 })
//                 const pagePdfBuffer = await renderPagePdfToBuffer({
//                   pageHtmlString,
//                 })
//                 requestResponse.statusCode = 200
//                 requestResponse.setHeader('Content-Type', 'application/pdf')
//                 requestResponse.end(pagePdfBuffer)
//               } else {
// const pageHtmlString = getPageHtmlStringWithInlineStyles({
//   PageContent,
//   htmlTitle,
//   htmlDescription,
//   jssTheme: jssThemeModule.default,
// })
// requestResponse.statusCode = 200
// requestResponse.setHeader('Content-Type', 'text/html')
// requestResponse.end(pageHtmlString)
//               }
//             }
//           )
//         } else {
//           requestResponse.statusCode = 404
//           requestResponse.end()
//         }
//       }
//     }
//   )
//   developmentServer.listen(serverPort)
// }

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { EventChannel, eventChannel } from 'redux-saga'
import createBundler from 'webpack'
import MemoryFileSystem from 'memory-fs'
import Path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Http from 'http'
import { call, fork, put, take, takeEvery } from 'redux-saga/effects'
import WebSocket from 'ws'
import Glob from 'glob'
import { decodeData } from '../helpers/decodeData'
import { PageModule, PageModuleCodec } from '../helpers/PageModule'
import { getPageHtmlStringWithInlineStyles } from '../helpers/getPageHtmlStringWithInlineStyles'
import { importLocalModule } from '../helpers/importLocalModule'
import { JssThemeModule, JssThemeModuleCodec } from '../helpers/JssThemeModule'
import Dotenv from 'dotenv'
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

const sagaMiddleware = createSagaMiddleware()
const serverStore = createStore((serverState, serverAction) => {},
applyMiddleware(sagaMiddleware))
sagaMiddleware.run(initializeDevelopmentServer)

function* initializeDevelopmentServer(): Generator {
  const globPagesModule = './source/pages/**/*.page.tsx'
  const pathJssThemeModule = './source/siteTheme.ts'
  const pageModulesPaths = Glob.sync(globPagesModule)
  const pageBundler = createBundler({
    mode: 'development',
    entry: pageModulesPaths[0],
    output: {
      globalObject: 'global',
      library: {
        name: 'currentPageModule',
        type: 'global',
      },
      filename: 'page.bundle.js',
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
  pageBundler.outputFileSystem = new MemoryFileSystem()
  const httpServer = (yield call(startHttpServer)) as Http.Server
  const clientChannel = (yield eventChannel<ClientEvent>((emitEvent) => {
    const webSocketServer = new WebSocket.Server({
      server: httpServer,
    })
    webSocketServer.on('connection', (webSocket) => {
      const clientId = Math.random()
      emitEvent({
        eventType: 'clientConnected',
        eventPayload: {
          webSocket,
          clientId,
        },
      })
      webSocket.on('message', (clientMessage: string) => {
        emitEvent({
          eventType: 'clientMessage',
          eventPayload: {
            webSocket,
            clientId,
            clientMessage: JSON.parse(clientMessage),
          },
        })
      })
      webSocket.on('close', () => {
        emitEvent({
          eventType: 'clientClosed',
          eventPayload: { clientId },
        })
      })
    })
    return () => {}
  })) as EventChannel<ClientEvent>
  const jssThemeModule = (yield call(() =>
    importLocalModule<JssThemeModule>({
      absolutePathCurrentWorkingDirectory: process.cwd(),
      targetCodec: JssThemeModuleCodec,
      localModulePath: pathJssThemeModule,
    })
  )) as JssThemeModule
  yield fork(function* () {
    while (true) {
      const clientEvent = (yield take<ClientEvent>(
        clientChannel
      )) as ClientEvent
      switch (clientEvent.eventType) {
        case 'clientConnected':
          yield put({
            type: 'clientRegistered',
            actionPayload: {
              ...clientEvent.eventPayload,
            },
          })
          break
        case 'clientMessage':
          const { webSocket, clientMessage } = clientEvent.eventPayload
          switch (clientMessage.messageType) {
            case 'updateClientPath':
              yield put({
                type: 'clientPathUpdated',
                actionPayload: {
                  webSocket,
                  ...clientMessage.messagePayload,
                },
              })
              break
          }
          break
        case 'clientClosed':
          yield put({
            type: 'clientUnregistered',
            actionPayload: {
              ...clientEvent.eventPayload,
            },
          })
          break
      }
    }
  })
  yield fork(function* () {
    while (true) {
      const clientPathUpdatedAction = (yield take('clientPathUpdated')) as any
      const pageBundleChannel = (yield eventChannel<any>((emitEvent) => {
        pageBundler.watch({ aggregateTimeout: 0 }, () => {
          pageBundler.outputFileSystem.readFile(
            '/dist/page.bundle.js',
            (readError, pageBundleData) => {
              const pageBundle = pageBundleData?.toString()
              if (pageBundle) {
                emitEvent({
                  eventType: 'pageBundleUpdated',
                  eventPayload: {
                    pageBundle,
                  },
                })
              } else {
                throw new Error('wtf? pageBundle')
              }
            }
          )
        })
        return () => {}
      })) as any
      yield fork(function* () {
        while (true) {
          const pageBundleEvent = (yield take(pageBundleChannel)) as any
          const { pageBundle } = pageBundleEvent.eventPayload
          const { PageContent, htmlTitle, htmlDescription } = (yield call(
            async () => {
              ;(() => eval(pageBundle.toString() as string))()
              const targetPageModule = await decodeData<PageModule>({
                targetCodec: PageModuleCodec,
                inputData: (global as any)['currentPageModule'],
              })
              return targetPageModule.default
            }
          )) as PageModule['default']
          const pageHtmlString = getPageHtmlStringWithInlineStyles({
            PageContent,
            htmlTitle,
            htmlDescription,
            jssTheme: jssThemeModule.default,
          })
          clientPathUpdatedAction.actionPayload.webSocket.send(
            JSON.stringify({
              messageType: 'loadPageContent',
              messagePayload: {
                pageHtmlString,
              },
            })
          )
        }
      })
    }
  })
}

type ClientEvent =
  | ClientEventBase<
      'clientConnected',
      {
        clientId: number
        webSocket: WebSocket
      }
    >
  | ClientMessageEvent
  | ClientEventBase<
      'clientClosed',
      {
        clientId: number
      }
    >

type ClientMessageEvent = ClientEventBase<
  'clientMessage',
  {
    clientId: number
    webSocket: WebSocket
    clientMessage: ClientMessage
  }
>
interface ClientEventBase<
  EventType extends string,
  EventPayload extends object
> {
  eventType: EventType
  eventPayload: EventPayload
}

type ClientMessage = ClientMessageBase<
  'updateClientPath',
  {
    clientPath: string
  }
>

interface ClientMessageBase<
  MessageType extends string,
  MessagePayload extends object
> {
  messageType: MessageType
  messagePayload: MessagePayload
}

async function startHttpServer() {
  const clientBundle = await getClientBundle()
  const httpServer = await new Promise<Http.Server>((resolve) => {
    const httpServer = Http.createServer(
      async (someRequest, requestResponse) => {
        const requestRoute = someRequest.url?.replace(/\?.*/, '')
        if (requestRoute === '/develop') {
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
        }
      }
    )
    httpServer.listen(3000, () => {
      resolve(httpServer)
    })
  })
  return httpServer
}

function getClientBundle() {
  return new Promise<string>((resolve) => {
    const clientBundler = createBundler({
      mode: 'production',
      devtool: false,
      entry: Path.resolve(__dirname, './client.ts'),
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
