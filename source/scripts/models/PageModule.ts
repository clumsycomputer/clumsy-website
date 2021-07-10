import { ReactElement } from 'react'
import * as IO from 'io-ts'
import { LocalModule } from './LocalModule'

export interface PageModule
  extends LocalModule<{
    pageRoute: string
    PageContent: () => ReactElement
    htmlTitle: string
    htmlDescription: string
    pdfFileName: string
    generatePdf: boolean
  }> {}

export const PageModuleCodec = IO.exact(
  IO.type({
    default: IO.exact(
      IO.type({
        pageRoute: IO.string,
        PageContent: IO.any,
        htmlTitle: IO.string,
        htmlDescription: IO.string,
        pdfFileName: IO.string,
        generatePdf: IO.boolean,
      })
    ),
  })
)
