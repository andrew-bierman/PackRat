import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { PackDetailsScreen } from 'app/modules/pack';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

export default function Pack() {
  const { currentTheme } = useTheme();

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
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),
        }}
      />
      <PackDetailsScreen />
    </>
  );
}
