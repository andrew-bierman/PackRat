import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import AppearanceContainer from 'app/screens/appearance/AppearanceContainer';

export default function Appearance() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Appearance</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Appearance',
          name: 'Appearance',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <AppearanceContainer />
    </>
  );
}
