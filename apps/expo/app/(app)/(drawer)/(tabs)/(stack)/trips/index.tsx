import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import { useAtom } from 'jotai';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';

export default function FeedNav() {
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
            hideWhenScrolling: false,
            inputType: 'text',
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
