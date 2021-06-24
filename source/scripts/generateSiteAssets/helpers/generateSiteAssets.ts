import ChildProcess from 'child_process'
import FileSystem from 'fs/promises'
import Glob from 'glob'
import Path from 'path'
import { importLocalModule } from '../../helpers/importLocalModule'
import {
  JssThemeModule,
  JssThemeModuleCodec,
} from '../../helpers/JssThemeModule'
import { LocalScript } from '../../helpers/LocalScript'
import { generatePageAssets } from './generatePageAssets'

export interface GenerateSiteAssetsApi extends LocalScript {
  globPagesModule: string
  pathJssThemeModule: string
  pathOutputDirectory: string
  pathAssetsDirectory: string
}

export async function generateSiteAssets(api: GenerateSiteAssetsApi) {
  const {
    absolutePathCurrentWorkingDirectory,
    pathOutputDirectory,
    pathAssetsDirectory,
    pathJssThemeModule,
    globPagesModule,
  } = api
  const absolutePathOutputDirectory = Path.resolve(
    absolutePathCurrentWorkingDirectory,
    pathOutputDirectory
  )
  await FileSystem.rm(absolutePathOutputDirectory, {
    recursive: true,
    force: true,
  })
  await FileSystem.mkdir(absolutePathOutputDirectory)
  const absoluteGlobAssets = Path.join(
    absolutePathCurrentWorkingDirectory,
    pathAssetsDirectory,
    '*'
  )
  ChildProcess.execSync(
    `cp ${absoluteGlobAssets} ${absolutePathOutputDirectory}`
  )
  const absolutePathTempPdfHtmlDirectory = Path.resolve(
    absolutePathCurrentWorkingDirectory,
    'tempPdfHtml'
  )
  await FileSystem.rm(absolutePathTempPdfHtmlDirectory, {
    recursive: true,
    force: true,
  })
  await FileSystem.mkdir(absolutePathTempPdfHtmlDirectory)
  const jssThemeModule = await importLocalModule<JssThemeModule>({
    absolutePathCurrentWorkingDirectory,
    targetCodec: JssThemeModuleCodec,
    localModulePath: pathJssThemeModule,
  })
  const pageModulesPaths = Glob.sync(globPagesModule)
  await Promise.all(
    pageModulesPaths.map((somePageModulePath) =>
      generatePageAssets({
        absolutePathCurrentWorkingDirectory,
        absolutePathOutputDirectory,
        absolutePathTempPdfHtmlDirectory,
        jssTheme: jssThemeModule.default,
        pageModulePath: somePageModulePath,
      })
    )
  )
  await FileSystem.rm(absolutePathTempPdfHtmlDirectory, {
    recursive: true,
    force: true,
  })
}
