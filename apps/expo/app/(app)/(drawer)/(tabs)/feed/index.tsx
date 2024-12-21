import { DrawerToggleButton } from '@react-navigation/drawer';
import { searchQueryAtom } from 'app/atoms/feed';
import { useRouterSettings } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { FeedScreen } from 'app/modules/feed';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useSetAtom } from 'jotai';
import React from 'react';
import { Platform } from 'react-native';

export default function FeedNav() {
  const { currentTheme } = useTheme();
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();
  const setSearchQuery = useSetAtom(searchQueryAtom);

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
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            hideWhenScrolling: false,
            inputType: 'text',
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },

          ...stackScreenOptionsHeaderSettings,
        }}
      />
      <FeedScreen />
    </>
  );
}
