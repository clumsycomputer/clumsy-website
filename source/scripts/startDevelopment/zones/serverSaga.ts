import Playwright from 'playwright'
import { Task } from 'redux-saga'
import { importLocalModule } from '../../helpers/importLocalModule'
import {
  JssThemeModule,
  JssThemeModuleCodec,
} from '../../helpers/JssThemeModule'
import { call, fork } from '../helpers/typedEffects'
import { clientSaga } from './clientSaga'
import { pageBundlerSaga } from './pageBundlerSaga'
import { StartDevelopmentApi } from './startDevelopment'

export interface ServerSagaApi
  extends Pick<
    StartDevelopmentApi,
    | 'currentWorkingDirectoryAbsolutePath'
    | 'pageModuleGlob'
    | 'serverPort'
    | 'jssThemeModulePath'
  > {}

export function* serverSaga(
  api: ServerSagaApi
): Generator<unknown, void, Task | any> {
  const {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModulePath,
  } = api
  const { jssThemeModule } = yield* call(importJssThemeModule, {
    currentWorkingDirectoryAbsolutePath,
    jssThemeModulePath,
  })
  const { playwrightBrowserContext } = yield* call(initializePlaywright)
  yield* fork(clientSaga, {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModule,
    playwrightBrowserContext,
  })
  yield* fork(pageBundlerSaga, {
    jssThemeModule,
    playwrightBrowserContext,
  })
}

export interface ImportJssThemeModuleApi
  extends Pick<
    ServerSagaApi,
    'currentWorkingDirectoryAbsolutePath' | 'jssThemeModulePath'
  > {}

export async function importJssThemeModule(api: ImportJssThemeModuleApi) {
  const { currentWorkingDirectoryAbsolutePath, jssThemeModulePath } = api
  const jssThemeModule = await importLocalModule<JssThemeModule>({
    currentWorkingDirectoryAbsolutePath,
    targetCodec: JssThemeModuleCodec,
    localModulePath: jssThemeModulePath,
  })
  return { jssThemeModule }
}

export async function initializePlaywright() {
  const playwrightBrowser = await Playwright.chromium.launch()
  const playwrightBrowserContext = await playwrightBrowser.newContext()
  return { playwrightBrowserContext }
}
