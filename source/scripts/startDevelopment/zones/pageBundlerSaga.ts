import MemoryFileSystem from 'memory-fs'
import React from 'react'
import * as ReactJss from 'react-jss'
import { buffers as SagaBuffer, eventChannel } from 'redux-saga'
import createBundler, { Configuration } from 'webpack'
import { decodeData } from '../../helpers/decodeData'
import { PageModule, PageModuleCodec } from '../../models/PageModule'
import {
  call,
  fork,
  put,
  select,
  takeAction,
  takeEvent,
} from '../helpers/typedEffects'
import {
  BrandedReturnType,
  ChildValue,
  EventBase,
  PickChild,
} from '../helpers/types'
import {
  ClientBundleServedAction,
  PageModuleBundlerCreatedAction,
  PageModuleUpdatedAction,
} from '../models/ServerAction'
import { ServerState } from '../models/ServerState'
import {
  memoizedGeneratePageHtmlContent,
  memoizedGeneratePagePdfContent,
} from '../helpers/generatePageContent'
import { importJssThemeModule, initializePlaywright } from './serverSaga'

export interface PageBundlerSagaApi
  extends BrandedReturnType<typeof importJssThemeModule>,
    BrandedReturnType<typeof initializePlaywright> {}

export function* pageBundlerSaga(api: PageBundlerSagaApi) {
  const { jssThemeModule, playwrightBrowserContext } = api
  while (true) {
    const { actionPayload } = yield* takeAction<ClientBundleServedAction>(
      'clientBundleServed'
    )
    const { pageModulePath } = actionPayload
    const targetPageModuleBundler = yield* select(
      (serverState) =>
        serverState.pageModuleBundlerEventChannels[pageModulePath]
    )
    if (!targetPageModuleBundler) {
      const { pageModuleBundlerEventChannel } =
        getPageModuleBundlerEventChannel({
          pageModulePath,
        })
      yield* put<PageModuleBundlerCreatedAction>({
        type: 'pageModuleBundlerCreated',
        actionPayload: {
          pageModulePath,
          pageModuleBundlerEventChannel,
        },
      })
      yield* fork(pageModuleUpdateHandler, {
        jssThemeModule,
        playwrightBrowserContext,
        pageModulePath,
        pageModuleBundlerEventChannel,
      })
    }
  }
}

export type PageModuleBundlerEvent = EventBase<
  `pageModuleBundled@${string}`,
  { pageModuleBundle: string }
>

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
      const developmentPageWebpackConfig = getDevelopmentPageWebpackConfig({
        pageModulePath,
        bundleId,
      })
      const pageModuleBundler = createBundler(developmentPageWebpackConfig)
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

interface GetDevelopmentPageWebpackConfigApi {
  pageModulePath: string
  bundleId: number
}

function getDevelopmentPageWebpackConfig(
  api: GetDevelopmentPageWebpackConfigApi
) {
  const { pageModulePath, bundleId } = api
  return {
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
  } as Configuration
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
    const { eventPayload } = yield* takeEvent(pageModuleBundlerEventChannel)
    const { pageModuleBundle } = eventPayload
    const { targetPageModule } = yield* call(decodeTargetPageModule, {
      pageModulePath,
      pageModuleBundle,
    })
    yield* put<PageModuleUpdatedAction>({
      type: 'pageModuleUpdated',
      actionPayload: {
        pageModulePath,
        updatedPageModule: targetPageModule,
      },
    })
    const serverState = yield* select((serverState) => serverState)
    const { targetClients } = getTargetClients({ pageModulePath, serverState })
    if (targetClients.htmlClients.length > 0) {
      const loadPageHtmlContentMessage = yield* memoizedGeneratePageHtmlContent(
        {
          jssThemeModule,
          pageModule: targetPageModule,
        }
      )
      targetClients.htmlClients.forEach((someActiveHtmlClient) => {
        someActiveHtmlClient.clientWebSocket.send(loadPageHtmlContentMessage)
      })
    }
    if (targetClients.pdfClients.length > 0) {
      const loadPagePdfContentMessage = yield* memoizedGeneratePagePdfContent({
        jssThemeModule,
        playwrightBrowserContext,
        pageModule: targetPageModule,
      })
      targetClients.pdfClients.forEach((someActivePdfClient) => {
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
  const { evaluatedPageModule } = evaluatePageModuleBundle({
    pageModuleBundle,
    pageModulePath,
    externalDependencies: {
      react: React,
      'react-jss': ReactJss,
    },
  })
  const targetPageModule = await decodeData<PageModule>({
    targetCodec: PageModuleCodec,
    inputData: evaluatedPageModule,
  })
  return { targetPageModule }
}

interface EvaluatePageModuleBundleApi {
  pageModuleBundle: string
  pageModulePath: string
  externalDependencies: {
    [importName: string]: any
  }
}

function evaluatePageModuleBundle(api: EvaluatePageModuleBundleApi) {
  const { externalDependencies, pageModuleBundle, pageModulePath } = api
  Object.entries(externalDependencies).forEach(
    ([someImportName, someExternalDependency]) => {
      if (!(global as any)[someImportName]) {
        ;(global as any)[someImportName] = someExternalDependency
      } else {
        throw new Error('wtf? page module external dependency already declared')
      }
    }
  )
  eval(pageModuleBundle)
  const evaluatedPageModule = (global as any)[
    `pageModule@${pageModulePath}`
  ] as unknown
  Object.entries(externalDependencies).forEach(([someImportName]) => {
    delete (global as any)[someImportName]
  })
  delete (global as any)[`pageModule@${pageModulePath}`]
  return { evaluatedPageModule }
}

interface GetTargetClientsApi
  extends Pick<PageModuleUpdateHandlerApi, 'pageModulePath'> {
  serverState: ServerState
}

function getTargetClients(api: GetTargetClientsApi) {
  const { serverState, pageModulePath } = api
  const { registeredClients } = serverState
  const targetClients = Object.values(registeredClients).reduce<{
    htmlClients: Array<
      ChildValue<GetTargetClientsApi['serverState']['registeredClients']>
    >
    pdfClients: Array<
      ChildValue<GetTargetClientsApi['serverState']['registeredClients']>
    >
  }>(
    (result, someRegisteredClient) => {
      const registeredClientMatches =
        pageModulePath === someRegisteredClient.pageModulePath
      const matchedClientWantsPdf =
        registeredClientMatches &&
        someRegisteredClient.clientRoute.endsWith('.pdf')
      if (matchedClientWantsPdf) {
        result.pdfClients.push(someRegisteredClient)
      } else if (registeredClientMatches) {
        result.htmlClients.push(someRegisteredClient)
      }
      return result
    },
    {
      htmlClients: [],
      pdfClients: [],
    }
  )
  return { targetClients }
}
