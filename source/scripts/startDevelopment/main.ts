import Dotenv from 'dotenv'
import Path from 'path'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { serverSaga } from './helpers/serverSaga'
import { serverReducer } from './helpers/serverReducer'
import { ServerAction, ServerState } from './helpers/types'

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
  sagaMiddleware.run(serverSaga, {
    currentWorkingDirectoryAbsolutePath,
    pageModuleGlob,
    serverPort,
    jssThemeModulePath,
  })
}
