import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { PackTemplateDetailsScreen } from 'app/modules/pack-templates';
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
          <title>Pack Template</title>
          <meta name="description" content="Pack Template" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Pack Template',
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),

          headerStyle: {
            backgroundColor: currentTheme.colors.background,
          },
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: currentTheme.colors.tertiaryBlue,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <PackTemplateDetailsScreen />
    </>
  );
}
