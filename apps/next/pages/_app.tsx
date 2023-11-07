import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import type { SolitoAppProps } from 'solito'
import '@tamagui/core/reset.css'
import { useFonts } from 'expo-font'

function MyApp({ Component, pageProps }: SolitoAppProps) {

  if (process.env.NODE_ENV === 'production') {
    // require('../public/tamagui.css')
  }

	const [loaded] = useFonts({
		Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
		InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
	});

	if (!loaded) {
		return null;
	}

  console.log('hello from _app.tsx')

  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <style>
          {`
            body, #root, #__next {
              min-width: 100% !important;
            }
          `}
        </style>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
