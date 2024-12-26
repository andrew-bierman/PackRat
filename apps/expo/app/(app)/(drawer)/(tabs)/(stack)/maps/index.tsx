import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { OfflineMapsScreen } from 'app/modules/map/screens/OfflineMapsScreen';
import { Stack } from 'expo-router';
import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import { useAtom } from 'jotai';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

export default function MapsScreen() {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);
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
            placeholder: 'Search maps',
            hideWhenScrolling: false,
            inputType: 'text',
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
          headerStyle: {
            backgroundColor: currentTheme.colors.background,
          },
          headerTitleStyle: {
            fontSize: 20,
          },
          headerTintColor: currentTheme.colors.text,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <OfflineMapsScreen />
    </>
  );
}
