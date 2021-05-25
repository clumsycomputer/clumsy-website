import { getHtmlFileString, GetHtmlFileStringApi } from './getHtmlFileString'

export interface GetStyleSheetStringApi
  extends Pick<
    GetHtmlFileStringApi,
    | 'PageContent'
    | 'htmlTitle'
    | 'htmlDescription'
    | 'jssTheme'
    | 'sheetsRegistry'
  > {}

export function getStyleSheetString(api: GetStyleSheetStringApi) {
  const {
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
  } = api
  getHtmlFileString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
    styleSheetString: null,
  })
  return sheetsRegistry.toString().replace(/\s+/g, '')
}
