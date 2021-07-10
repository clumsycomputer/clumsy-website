import FileSystem from 'fs/promises'
import Path from 'path'
import { getPageHtmlStringWithInlineStyles } from '../../helpers/getPageHtmlStringWithInlineStyles'
import { PageModule } from '../../models/PageModule'
import { GeneratePageAssetsApi } from './generatePageAssets'

export interface GeneratePageHtmlApi
  extends Pick<GeneratePageAssetsApi, 'jssTheme'>,
    Pick<
      PageModule['default'],
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
  const pageHtmlFileString = getPageHtmlStringWithInlineStyles({
    PageContent,
    htmlTitle,
    htmlDescription,
    jssTheme,
  })
  const absolutePathHtmlRouteDirectory = Path.dirname(absolutePathHtmlFile)
  await FileSystem.mkdir(absolutePathHtmlRouteDirectory, {
    recursive: true,
  })
  await FileSystem.writeFile(
    absolutePathHtmlFile,
    `<!DOCTYPE html>${pageHtmlFileString}`,
    {
      encoding: 'utf-8',
    }
  )
}
