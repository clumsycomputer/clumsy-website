import * as IO from 'io-ts'
import { SiteTheme } from '../../siteTheme'
import { LocalModule } from './LocalModule'

export interface JssThemeModule extends LocalModule<SiteTheme> {}

export const JssThemeModuleCodec = IO.exact(
  IO.type({
    default: IO.exact(
      IO.type({
        pdfMode: IO.boolean,
        spacing: IO.any,
        palette: IO.exact(
          IO.type({
            lightGrey: IO.string,
          })
        ),
      })
    ),
  })
)
