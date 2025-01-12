import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { OfflineMapsScreen } from 'app/modules/map/screens/OfflineMapsScreen';
import { Stack } from 'expo-router';
import { useAtom } from 'jotai';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';
import { useRouterSettings } from 'app/hooks/router';
import { searchQueryAtom } from 'app/modules/feed/atoms';

export default function MapsScreen() {
  const { currentTheme } = useTheme();
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Map</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Maps',
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),
          headerSearchBarOptions: {
            placeholder: 'Search',
            headerIconColor: currentTheme.colors.text,
            hideWhenScrolling: false,
            inputType: 'text',
            textColor:
              Platform.OS === 'android' ? currentTheme.colors.text : undefined,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
          ...stackScreenOptionsHeaderSettings,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <OfflineMapsScreen />
    </>
  );
}
