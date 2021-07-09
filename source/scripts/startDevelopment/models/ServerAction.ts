import { Action } from 'redux'
import { EventChannel } from 'redux-saga'
import WebSocket from 'ws'
import { PageModule } from '../../helpers/PageModule'
import { PageModuleBundlerEvent } from '../zones/pageBundlerSaga'

export type ServerAction =
  | ClientBundleServedAction
  | ClientRegisteredAction
  | ClientUnregisteredAction
  | PageModuleBundlerCreatedAction
  | PageModuleUpdatedAction
  | PagePdfRenderedAction

export interface ClientBundleServedAction
  extends ActionBase<
    'clientBundleServed',
    {
      pageModulePath: string
    }
  > {}

export interface ClientRegisteredAction
  extends ActionBase<
    'clientRegistered',
    {
      clientId: number
      clientRoute: string
      clientWebSocket: WebSocket
      pageModulePath: string
    }
  > {}

export interface ClientUnregisteredAction
  extends ActionBase<
    'clientUnregistered',
    {
      clientId: number
    }
  > {}

export interface PageModuleBundlerCreatedAction
  extends ActionBase<
    'pageModuleBundlerCreated',
    {
      pageModulePath: string
      pageModuleBundlerEventChannel: EventChannel<PageModuleBundlerEvent>
    }
  > {}

export interface PageModuleUpdatedAction
  extends ActionBase<
    'pageModuleUpdated',
    {
      pageModulePath: string
      updatedPageModule: PageModule
    }
  > {}

export interface PagePdfRenderedAction
  extends ActionBase<
    'pagePdfRendered',
    {
      pagePdfBuffer: Buffer
      pagePdfRoute: string
    }
  > {}

interface ActionBase<ActionType extends string, ActionPayload extends object>
  extends Action<ActionType> {
  actionPayload: ActionPayload
}
