import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function FeedNav() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Feed</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Trips',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <FeedScreen feedType="userTrips" />
    </>
  );
}
