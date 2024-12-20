import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouterSettings } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { FeedScreen } from 'app/modules/feed';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

export default function FeedNav() {
  const { currentTheme } = useTheme();
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();
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
          title: 'Feed',
          headerRight: () => (
            <DrawerToggleButton tintColor={currentTheme.colors.tertiaryBlue} />
          ),

          ...stackScreenOptionsHeaderSettings,
          // headerStyle: {
          //   // backgroundColor: currentTheme.colors.background,
          //   // Hack to ensure the collapsed small header shows the shadow / border.
          //   backgroundColor: "rgba(255,255,255,0.01)",
          // },
          // headerTransparent: process.env.EXPO_OS === "ios",
          // headerTitleStyle: {
          //   fontSize: 24,
          // },

          // headerTintColor: currentTheme.colors.tertiaryBlue,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <FeedScreen />
    </>
  );
}
