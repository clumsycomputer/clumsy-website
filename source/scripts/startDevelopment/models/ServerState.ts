import { EventChannel } from 'redux-saga'
import WebSocket from 'ws'
import { PageModule } from '../../helpers/PageModule'
import { PageModuleBundlerEvent } from '../zones/pageBundlerSaga'

export interface ServerState {
  registeredClients: {
    [clientId: number]: {
      clientId: number
      clientRoute: string
      clientWebSocket: WebSocket
      pageModulePath: string
    }
  }
  pageModuleBundlerEventChannels: {
    [pageModulePath: string]: EventChannel<PageModuleBundlerEvent>
  }
  activePageModules: {
    [pageModulePath: string]: PageModule
  }
  pagePdfBuffers: {
    [tempPdfRoute: string]: Buffer
  }
}
