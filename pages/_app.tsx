import "../styles/_app.scss";
import type { AppProps } from "next/app";

function WebsiteApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default WebsiteApp;
