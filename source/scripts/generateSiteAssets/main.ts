import Dotenv from 'dotenv'
import Path from 'path'
import { generateSiteAssets } from './helpers/generateSiteAssets'

main()

function main() {
  const currentWorkingDirectoryAbsolutePath = process.cwd()
  Dotenv.config({
    path: Path.join(
      currentWorkingDirectoryAbsolutePath,
      process.env.NODE_ENV === 'production'
        ? './.env.production'
        : './.env.development'
    ),
  })
  generateSiteAssets({
    currentWorkingDirectoryAbsolutePath,
    globPagesModule: './source/pages/**/*.page.tsx',
    pathJssThemeModule: './source/siteTheme',
    pathOutputDirectory: './public',
    pathAssetsDirectory: './source/assets',
  })
}
