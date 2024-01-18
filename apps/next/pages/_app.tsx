import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';
import 'setimmediate';
import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';
import '@tamagui/font-inter/css/400.css';
import 'raf/polyfill';
import { Provider } from 'app/provider';
import { TamaguiProvider } from 'tamagui';

import Head from 'next/head';
import React from 'react';
import type { SolitoAppProps } from 'solito';
import { Navigation } from 'app/components/navigation';
import { PortalProvider } from 'tamagui';

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  return (
    <>
      <Head>
        <title>Tamagui Example App</title>
        <meta name="description" content="Tamagui, Solito, Expo & Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Disabling provider until tamagui + next js config is complete */}
      <Provider>
        <Navigation />
        <PortalProvider>
          <Component {...pageProps} />
        </PortalProvider>
      </Provider>
    </>
  );
}

export default MyApp;
