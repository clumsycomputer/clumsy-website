import ChildProcess from 'child_process'
import FileSystem from 'fs/promises'
import Path from 'path'
import Glob from 'glob'
import { generatePageAssets } from './generatePageAssets'

export interface GenerateSiteAssetsApi {
  globPagesModule: string
  pathJssThemeModule: string
  pathOutputDirectory: string
  pathAssetsDirectory: string
  absolutePathCurrentWorkingDirectory: string
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
  const absolutePathJssThemeModule = Path.resolve(
    absolutePathCurrentWorkingDirectory,
    pathJssThemeModule
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
  const JssThemeModule = await import(absolutePathJssThemeModule)
  const pageModulesPaths = Glob.sync(globPagesModule)
  await Promise.all(
    pageModulesPaths.map((somePageModulePath) =>
      generatePageAssets({
        absolutePathCurrentWorkingDirectory,
        absolutePathOutputDirectory,
        absolutePathTempPdfHtmlDirectory,
        jssTheme: JssThemeModule.default,
        pageModulePath: somePageModulePath,
      })
    )
  )
  await FileSystem.rm(absolutePathTempPdfHtmlDirectory, {
    recursive: true,
    force: true,
  })
}
