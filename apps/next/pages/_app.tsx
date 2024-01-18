import 'raf/polyfill';
import 'setimmediate';
import '@tamagui/core/reset.css'
import '@tamagui/polyfill-dev'
import '@tamagui/font-inter/css/400.css'
import 'raf/polyfill'
import { Provider } from 'app/provider';
import Head from 'next/head';
import React from 'react';
import type { SolitoAppProps } from 'solito';
import { Navigation } from 'app/components/navigation'
import { PortalProvider } from 'tamagui'

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Disabling provider until tamagui + next js config is complete */}
      <Provider>
        <Navigation />
        <PortalProvider>
          {getLayout(<Component {...pageProps} />)}
        </PortalProvider>
      </Provider>
    </>
  );
}

export default MyApp;
