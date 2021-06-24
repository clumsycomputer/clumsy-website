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
  const { htmlDescription, htmlTitle, jssTheme, PageContent } = api
  const sheetsRegistry = new SheetsRegistry()
  const styleSheetString = getStyleSheetString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
  })
  const pageHtmlWithInlineStylesString = getPageHtmlString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
    styleSheetString,
  })
  return pageHtmlWithInlineStylesString
}

interface GetPageHtmlStringApi
  extends Pick<
    GetPageHtmlStringWithInlineStylesApi,
    'jssTheme' | 'PageContent' | 'htmlTitle' | 'htmlDescription'
  > {
  sheetsRegistry: SheetsRegistry
  styleSheetString: ReturnType<typeof getStyleSheetString> | null
}

function getPageHtmlString(api: GetPageHtmlStringApi) {
  const {
    htmlDescription,
    htmlTitle,
    jssTheme,
    PageContent,
    sheetsRegistry,
    styleSheetString,
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
      <body>
        <JssProvider registry={sheetsRegistry}>
          <ThemeProvider theme={jssTheme}>
            <PageContent />
          </ThemeProvider>
        </JssProvider>
      </body>
    </html>
  )
}

interface GetStyleSheetStringApi
  extends Pick<
      GetPageHtmlStringWithInlineStylesApi,
      'PageContent' | 'htmlTitle' | 'htmlDescription' | 'jssTheme'
    >,
    Pick<GetPageHtmlStringApi, 'sheetsRegistry'> {}

function getStyleSheetString(api: GetStyleSheetStringApi) {
  const { PageContent, htmlTitle, htmlDescription, jssTheme, sheetsRegistry } =
    api
  getPageHtmlString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
    styleSheetString: null,
  })
  return sheetsRegistry.toString().replace(/\s+/g, '')
}
