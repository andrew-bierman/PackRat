import '@tamagui/core/reset.css';
import '@tamagui/font-inter/css/400.css';
import '@tamagui/font-inter/css/700.css';
import 'raf/polyfill';
import 'setimmediate';
import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';
import '@tamagui/font-inter/css/400.css';
import '../styles/global.css';
import 'raf/polyfill';
import { Provider } from 'app/provider';
import { TamaguiProvider } from 'tamagui';

import Head from 'next/head';
import React from 'react';
import type { SolitoAppProps } from 'solito';
import { Navigation, Navbar } from 'app/components/navigation';
import { PortalProvider } from 'tamagui';
import { Container, MainContentWeb } from '@packrat/ui';

import * as WebBrowser from 'expo-web-browser';
import { config } from '@packrat/ui/src/tamagui.config';
WebBrowser.maybeCompleteAuthSession();

if (process.env.NODE_ENV === 'production') {
  require('../public/tamagui.css');
}

function MyApp({ Component, pageProps }: SolitoAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>PackRat</title>
        <meta
          name="description"
          content="PackRat is a versatile adventure planner tailored for outdoor enthusiasts. It simplifies the process of organizing trips from a simple day hike to cross-country journeys."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Disabling provider until tamagui + next js config is complete */}
      <Provider>
        <Navbar />
        <PortalProvider>
          <MainContentWeb>
            <Container>{getLayout(<Component {...pageProps} />)}</Container>
          </MainContentWeb>
        </PortalProvider>
      </Provider>
    </>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useRootTheme();

  return (
    <NextThemeProvider
      onChangeTheme={(next) => {
        setTheme(next as any);
      }}
    >
      <TamaguiProvider
        disableRootThemeClass
        defaultTheme={theme}
        config={config}
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
