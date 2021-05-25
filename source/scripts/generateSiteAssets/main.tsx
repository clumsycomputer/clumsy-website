import Dotenv from 'dotenv'
import Path from 'path'
import { generateSiteAssets } from './helpers/generateSiteAssets'

const absolutePathCurrentWorkingDirectory = process.cwd()
Dotenv.config({
  path: Path.join(
    absolutePathCurrentWorkingDirectory,
    process.env.NODE_ENV === 'production'
      ? './.env.production'
      : './.env.development'
  ),
})
generateSiteAssets({
  absolutePathCurrentWorkingDirectory,
  globPagesModule: './source/pages/**/*.page.tsx',
  pathJssThemeModule: './source/siteTheme',
  pathOutputDirectory: './public',
  pathAssetsDirectory: './source/assets',
})
