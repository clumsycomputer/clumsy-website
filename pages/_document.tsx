import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { Fragment } from 'react'
import { JssProvider, SheetsRegistry, createGenerateId } from 'react-jss'

export const serverSideStylesId = 'server-side-styles'

class WebsiteDocument extends Document {
  static async getInitialProps(documentContext: DocumentContext) {
    const jssRegistry = new SheetsRegistry()
    const jssGenerateId = createGenerateId()
    const renderNextPage = documentContext.renderPage
    documentContext.renderPage = () =>
      renderNextPage({
        enhanceApp: (WebsiteApp) => (appProps) =>
          (
            <JssProvider registry={jssRegistry} generateId={jssGenerateId}>
              <WebsiteApp {...appProps} />
            </JssProvider>
          ),
      })
    const initialPropsBase = await Document.getInitialProps(documentContext)
    return {
      ...initialPropsBase,
      styles: (
        <Fragment>
          {initialPropsBase.styles}
          <style
            id={serverSideStylesId}
            dangerouslySetInnerHTML={{ __html: jssRegistry.toString() }}
          />
        </Fragment>
      ),
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default WebsiteDocument
