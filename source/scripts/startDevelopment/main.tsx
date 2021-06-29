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
//   const jssThemeModule = await importLocalModule<JssThemeModule>({
//     absolutePathCurrentWorkingDirectory,
//     targetCodec: JssThemeModuleCodec,
//     localModulePath: pathJssThemeModule,
//   })
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
//               ;(() => eval(fileData?.toString() as string))()
//               const targetPageModule = await decodeData<PageModule>({
//                 targetCodec: PageModuleCodec,
//                 inputData: (global as any)['currentPageModule'],
//               })
//               const { PageContent, htmlTitle, htmlDescription } =
//                 targetPageModule.default
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
//                 const pageHtmlString = getPageHtmlStringWithInlineStyles({
//                   PageContent,
//                   htmlTitle,
//                   htmlDescription,
//                   jssTheme: jssThemeModule.default,
//                 })
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

import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from '@reduxjs/toolkit'
import createBundler from 'webpack'
import MemoryFileSystem from 'memory-fs'
import Path from 'path'
import Http from 'http'
import ReactDOMServer from 'react-dom/server'
import React from 'react'
import WebSocket from 'ws'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: {} as {
    [clientId: number]: { id: number; webSocket: WebSocket }
  },
  reducers: {
    registerClient: (
      clientsState,
      action: PayloadAction<{ id: number; webSocket: WebSocket }>
    ) => ({
      ...clientsState,
      [action.payload.id]: action.payload,
    }),
    updateClientPath: (
      clientsState,
      action: PayloadAction<{ id: number; clientPath: string }>
    ) => {
      const nextClientsState = { ...clientsState }
      nextClientsState[action.payload.id] = {
        ...nextClientsState[action.payload.id],
        ...action.payload,
      }
      return nextClientsState
    },
    unregisterClient: (clientsState, action: PayloadAction<{ id: number }>) => {
      const nextClientsState = { ...clientsState }
      delete nextClientsState[action.payload.id]
      return nextClientsState
    },
  },
})

main()

async function main() {
  const serverStore = configureStore({
    reducer: {
      clients: clientsSlice.reducer,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['clients/registerClient', 'clients/updateClientPath'],
        // ignoredPaths: ['clients.*.webSocket'],
      },
    }),
  })
  serverStore.subscribe(() => {
    console.log(serverStore.getState())
  })
  const httpServer = await startHttpServer()
  const webSocketServer = new WebSocket.Server({
    server: httpServer,
  })
  webSocketServer.on('connection', (webSocket) => {
    const newClientId = Math.random()
    serverStore.dispatch(
      clientsSlice.actions.registerClient({
        webSocket,
        id: newClientId,
      })
    )
    webSocket.on('message', (messageData) => {
      const messageAction = JSON.parse(messageData as string)
      if (messageAction.type === 'updateClientPath') {
        console.log('AAAA')
        serverStore.dispatch(
          clientsSlice.actions.updateClientPath(messageAction.payload)
        )
      }
    })
    webSocket.on('close', () => {
      serverStore.dispatch(
        clientsSlice.actions.unregisterClient({
          id: newClientId,
        })
      )
    })
    webSocket.send(
      JSON.stringify({
        type: 'clientRegistered',
        payload: {
          id: newClientId,
        },
      })
    )
  })
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
