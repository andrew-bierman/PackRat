import Maps from 'app/screens/maps';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function MapsScreen() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Map</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Maps',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Maps />
    </>
  );
}
