import CreateTrip from '../../../screens/trip/createTrip';

import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Trip() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Create Trip</title>
          <meta name="description" content="Create Trip" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Create Trip',
          name: 'Create Trip',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <CreateTrip />
    </>
  );
}
