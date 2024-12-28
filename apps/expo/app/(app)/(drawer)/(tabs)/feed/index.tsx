import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouterSettings } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { FeedScreen } from 'app/modules/feed';
import { searchQueryAtom } from 'app/modules/feed/atoms';
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
          headerRight: () => (
            <DrawerToggleButton tintColor={currentTheme.colors.text} />
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            headerIconColor: currentTheme.colors.text,

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
