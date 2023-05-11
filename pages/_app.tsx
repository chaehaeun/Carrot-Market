import { SWRConfig } from 'swr';
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher : (url: string) => fetch(url).then((res) => res.json())}}>
      <div className="w-full max-w-xl mx-auto bg-white">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
