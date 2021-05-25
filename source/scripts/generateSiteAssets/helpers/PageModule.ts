import { ReactElement } from 'react'
import * as IO from 'io-ts'

export interface PageModule {
  default: PageModuleExports
}

export interface PageModuleExports {
  pageRoute: string
  PageContent: () => ReactElement
  htmlTitle: string
  htmlDescription: string
  pdfFileName: string
  generatePdf: boolean
}

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
