import { DrawerToggleButton } from '@react-navigation/drawer';
import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import useTheme from 'app/hooks/useTheme';
import { FeedScreen } from 'app/modules/feed';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useAtom } from 'jotai';
import React from 'react';
import { Platform } from 'react-native';

export default function Packs() {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Packs</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Packs',
          headerSearchBarOptions: {
            placeholder: 'Search packs',
            hideWhenScrolling: false,
            inputType: 'text',
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },

          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),

          // headerStyle: {
          //   backgroundColor: currentTheme.colors.background,
          // },
          // headerTitleStyle: {
          //   fontSize: 24,
          // },
          // headerTintColor: currentTheme.colors.tertiaryBlue,

          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <FeedScreen feedType="userPacks" />
    </>
  );
}
