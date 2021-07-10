import Dotenv from 'dotenv'
import Path from 'path'
import { startDevelopment } from './zones/startDevelopment'

main()

function main() {
  console.log('starting server...')
  const currentWorkingDirectoryAbsolutePath = process.cwd()
  Dotenv.config({
    path: Path.join(
      currentWorkingDirectoryAbsolutePath,
      process.env.NODE_ENV === 'production'
        ? './.env.production'
        : './.env.development'
    ),
  })
  startDevelopment({
    currentWorkingDirectoryAbsolutePath,
    serverPort: 3000,
    pageModuleGlob: './source/pages/**/*.page.tsx',
    jssThemeModulePath: './source/siteTheme.ts',
  })
}
