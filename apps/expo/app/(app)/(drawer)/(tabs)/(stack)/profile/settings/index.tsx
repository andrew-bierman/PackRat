import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SettingsScreen } from 'app/modules/user';
import Head from 'expo-router/head';
import { useRouterSettings } from 'app/hooks/router';

export default function SettingsPage() {
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Settings</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Settings',
          ...stackScreenOptionsHeaderSettings,
          // http://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <SettingsScreen />
    </>
  );
}
