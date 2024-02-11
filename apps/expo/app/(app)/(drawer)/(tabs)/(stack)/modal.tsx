import { Platform, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { RText } from '@packrat/ui';

export default function Modal() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Modal</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Modal',
          // http://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component

          presentation: 'modal',
        }}
        screenOptions={{ headerShown: false, headerTitle: 'modal' }}
      />
      <RText>modal</RText>
      {/* Add Modal content logic */}
    </>
  );
}
