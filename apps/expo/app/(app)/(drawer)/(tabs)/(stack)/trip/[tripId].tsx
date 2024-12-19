import React from 'react';
import EditTripScreen from 'app/screens/trip/editTrip';

import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Trip() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Trip</title>
          <meta name="description" content="Trip" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Trip',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <EditTripScreen />
    </>
  );
}
