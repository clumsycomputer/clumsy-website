import React from 'react'
import ReactDomServer from 'react-dom/server'
import { JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss'
import { PageModule } from './PageModule'

export interface GetPageHtmlStringWithInlineStylesApi
  extends Pick<
    PageModule['default'],
    'PageContent' | 'htmlTitle' | 'htmlDescription'
  > {
  jssTheme: Jss.Theme
}

export function getPageHtmlStringWithInlineStyles(
  api: GetPageHtmlStringWithInlineStylesApi
) {
  const { jssTheme, PageContent, htmlDescription, htmlTitle } = api
  const sheetsRegistry = new SheetsRegistry()
  const { pageBodyInnerHtmlString, styleSheetString } =
    getPageBodyInnerHtmlStringAndStyleSheetString({
      jssTheme,
      PageContent,
      sheetsRegistry,
    })
  const pageHtmlWithInlineStylesString = getPageHtmlString({
    htmlTitle,
    htmlDescription,
    pageBodyInnerHtmlString,
    styleSheetString,
  })
  return pageHtmlWithInlineStylesString
}

interface GetPageHtmlStringApi
  extends Pick<
      GetPageHtmlStringWithInlineStylesApi,
      'htmlTitle' | 'htmlDescription'
    >,
    Pick<
      ReturnType<typeof getPageBodyInnerHtmlStringAndStyleSheetString>,
      'styleSheetString' | 'pageBodyInnerHtmlString'
    > {}

function getPageHtmlString(api: GetPageHtmlStringApi) {
  const {
    htmlDescription,
    htmlTitle,
    styleSheetString,
    pageBodyInnerHtmlString,
  } = api
  return ReactDomServer.renderToStaticMarkup(
    <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1'}
        />
        <meta name={'description'} content={htmlDescription} />
        <title>{htmlTitle}</title>
        <style>{styleSheetString}</style>
      </head>
      <body
        dangerouslySetInnerHTML={{
          __html: pageBodyInnerHtmlString,
        }}
      />
    </html>
  )
}

export interface GetPageBodyInnerHtmlStringAndStyleSheetStringApi
  extends Pick<
    GetPageHtmlStringWithInlineStylesApi,
    'jssTheme' | 'PageContent'
  > {
  sheetsRegistry: SheetsRegistry
}

export function getPageBodyInnerHtmlStringAndStyleSheetString(
  api: GetPageBodyInnerHtmlStringAndStyleSheetStringApi
) {
  const { sheetsRegistry, jssTheme, PageContent } = api
  const pageBodyInnerHtmlString = ReactDomServer.renderToStaticMarkup(
    <JssProvider registry={sheetsRegistry}>
      <ThemeProvider theme={jssTheme}>
        <PageContent />
      </ThemeProvider>
    </JssProvider>
  )
  const styleSheetString = sheetsRegistry.toString().replace(/\s+/g, '')
  return {
    pageBodyInnerHtmlString,
    styleSheetString,
  }
}