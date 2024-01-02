import Feed from '../../../screens/feed/Feed';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Packs() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Packs</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Packs',
          name: 'Packs',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Feed feedType="userPacks" />
    </>
  );
}
