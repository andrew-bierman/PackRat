import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import { useAtom } from 'jotai';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import useTheme from 'app/hooks/useTheme';
export default function FeedNav() {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);

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
          title: 'Trips',
          headerSearchBarOptions: {
            placeholder: 'Search trips',
            headerIconColor: currentTheme.colors.text,
            hideWhenScrolling: false,
            inputType: 'text',
            textColor:
              Platform.OS === 'android' ? currentTheme.colors.text : undefined,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <FeedScreen feedType="userTrips" />
    </>
  );
}
