import React from 'react';
import { ItemDetailsScreen } from 'app/modules/item';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function Item() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Item</title>
          <meta name="description" content="Item" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Item',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <ItemDetailsScreen />
    </>
  );
}
