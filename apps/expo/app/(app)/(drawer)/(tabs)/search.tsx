import { Platform, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';

export default function Search() {
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Search</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Search',
          // http://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <PlacesAutocomplete
        style={{ width: '100%' }}
        placeholder="Search for a place"
      />
      {/* Add search virtual list for feed, packs, trips, places with prop to determine which to display */}
    </>
  );
}
