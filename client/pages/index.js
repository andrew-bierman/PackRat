import Head from 'next/head';
import { View, Text } from "react-native"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <View>
        <Text>hello</Text>
      </View>
    </>
  );
}