import FileSystem from 'fs/promises'
import Path from 'path'
import { SheetsRegistry } from 'react-jss'
import { GeneratePageAssetsApi } from './generatePageAssets'
import { getHtmlFileString } from './getHtmlFileString'
import { getStyleSheetString } from './getStyleSheetString'
import { PageModuleExports } from './PageModule'

export interface GeneratePageHtmlApi
  extends Pick<GeneratePageAssetsApi, 'jssTheme'>,
    Pick<
      PageModuleExports,
      'pageRoute' | 'PageContent' | 'htmlTitle' | 'htmlDescription'
    > {
  absolutePathHtmlFile: string
}

export async function generatePageHtml(api: GeneratePageHtmlApi) {
  const {
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    absolutePathHtmlFile,
  } = api
  const sheetsRegistry = new SheetsRegistry()
  const styleSheetString = getStyleSheetString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
  })
  const htmlFileString = getHtmlFileString({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
    sheetsRegistry,
    styleSheetString,
  })
  const absolutePathHtmlRouteDirectory = Path.dirname(absolutePathHtmlFile)
  await FileSystem.mkdir(absolutePathHtmlRouteDirectory, {
    recursive: true,
  })
  await FileSystem.writeFile(
    absolutePathHtmlFile,
    `<!DOCTYPE html>${htmlFileString}`,
    {
      encoding: 'utf-8',
    }
  )
}
