import React from 'react'
import ReactDomServer from 'react-dom/server'
import { JssProvider, SheetsRegistry, ThemeProvider } from 'react-jss'
import { GeneratePageAssetsApi } from './generatePageAssets'
import { getStyleSheetString } from './getStyleSheetString'
import { PageModuleExports } from './PageModule'

export interface GetHtmlFileStringApi
  extends Pick<GeneratePageAssetsApi, 'jssTheme'>,
    Pick<PageModuleExports, 'PageContent' | 'htmlTitle' | 'htmlDescription'> {
  sheetsRegistry: SheetsRegistry
  styleSheetString: ReturnType<typeof getStyleSheetString> | null
}

export function getHtmlFileString(api: GetHtmlFileStringApi) {
  const {
    htmlDescription,
    htmlTitle,
    styleSheetString,
    sheetsRegistry,
    jssTheme,
    PageContent,
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
