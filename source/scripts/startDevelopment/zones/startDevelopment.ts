import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import {
  ClientRegisteredAction,
  ClientUnregisteredAction,
  PageModuleBundlerCreatedAction,
  PageModuleUpdatedAction,
  PagePdfRenderedAction,
  ServerAction,
} from '../models/ServerAction'
import { ServerState } from '../models/ServerState'
import { serverSaga, ServerSagaApi } from './serverSaga'

export interface StartDevelopmentApi {
  currentWorkingDirectoryAbsolutePath: string
  serverPort: number
  pageModuleGlob: string
  jssThemeModulePath: string
}

export function startDevelopment(api: StartDevelopmentApi) {
  const {
    currentWorkingDirectoryAbsolutePath,
    serverPort,
    pageModuleGlob,
    jssThemeModulePath,
  } = api
  const sagaMiddleware = createSagaMiddleware()
  createStore<ServerState, ServerAction, { dispatch: unknown }, {}>(
    serverReducer,
    applyMiddleware(sagaMiddleware)
  )
  sagaMiddleware.run(
    serverSaga as (api: ServerSagaApi) => Generator<unknown, void, Task | any>,
    {
      currentWorkingDirectoryAbsolutePath,
      serverPort,
      pageModuleGlob,
      jssThemeModulePath,
    }
  )
}

export function serverReducer(
  serverState: ServerState = {
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
