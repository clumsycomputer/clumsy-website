import { SheetsRegistry } from 'react-jss'
import { SagaReturnType } from 'redux-saga/effects'
import {
  getPageBodyInnerHtmlStringAndStyleSheetString,
  getPageHtmlStringWithInlineStyles,
} from '../../helpers/getPageHtmlStringWithInlineStyles'
import { PageModule } from '../../models/PageModule'
import { call, put } from './typedEffects'
import { BrandedReturnType } from './types'
import { PagePdfRenderedAction } from '../models/ServerAction'
import {
  LoadPageHtmlContentMessage,
  LoadPagePdfContentMessage,
} from '../models/ServerMessage'
import { importJssThemeModule, initializePlaywright } from '../zones/serverSaga'

export const memoizedGeneratePageHtmlContent = memoizeSaga({
  baseSaga: generatePageHtmlContent,
  checkShouldRun: ({
    previousArgs: [previousApi],
    currentArgs: [currentApi],
  }) => previousApi.pageModule !== currentApi.pageModule,
})

export const memoizedGeneratePagePdfContent = memoizeSaga({
  baseSaga: generatePagePdfContent,
  checkShouldRun: ({
    previousArgs: [previousApi],
    currentArgs: [currentApi],
  }) => previousApi.pageModule !== currentApi.pageModule,
})

interface GeneratePageHtmlContentApi
  extends BrandedReturnType<typeof importJssThemeModule> {
  pageModule: PageModule
}

function* generatePageHtmlContent(api: GeneratePageHtmlContentApi) {
  const { pageModule, jssThemeModule } = api
  const { PageContent } = pageModule.default
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
    BrandedReturnType<typeof initializePlaywright> {
  pageModule: PageModule
}

function* generatePagePdfContent(api: GeneratePagePdfContentApi) {
  const { pageModule, jssThemeModule, playwrightBrowserContext } = api
  const { PageContent, htmlTitle, htmlDescription, pdfFileName } =
    pageModule.default
  const pageHtmlString = getPageHtmlStringWithInlineStyles({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme: {
      ...jssThemeModule.default,
      pdfMode: true,
    },
  })
  const { pagePdfBuffer } = yield* call(renderPagePdf, {
    playwrightBrowserContext,
    pageHtmlString,
  })
  const newPagePdfRoute = `/tempPdf/${pdfFileName}.${Math.random()}.pdf`
  yield* put<PagePdfRenderedAction>({
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
