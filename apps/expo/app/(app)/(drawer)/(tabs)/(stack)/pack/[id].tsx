import React from 'react';
import PackContainer from 'app/components/pack/PackContainer';
import { PackDetails } from 'app/components/pack/PackDetails';
import { DetailsComponent } from 'app/components/details';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Pack() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Pack</title>
          <meta name="description" content="Pack" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Pack',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      {/* <DetailsComponent type='pack'/> */}
      <PackDetails />
    </>
  );
}
