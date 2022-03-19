import type { AppProps } from 'next/app'
import { ThemeProvider } from 'react-jss'
import '../styles/globals.css'

interface WebsiteTheme {}

const websiteTheme: WebsiteTheme = {}

function WebsiteApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={websiteTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default WebsiteApp
