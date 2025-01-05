import { RStack } from '@packrat/ui';
import { PlacesAutocomplete } from 'app/components/PlacesAutocomplete';
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { Stack, useFocusEffect } from 'expo-router';
import Head from 'expo-router/head';
import React, { useCallback, useRef } from 'react';
import { Platform, SafeAreaView, type TextInput } from 'react-native';

interface SearchResult {
  properties: {
    osm_id: number;
    osm_type: string;
    name: string;
  };
  geometry: {
    coordinates: [number, number];
  };
}

export default function Search() {
  const ref = useRef<TextInput>();
  const { currentTheme } = useTheme();
  const router = useRouter();
  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        if (ref.current?.focus) {
          ref.current.focus();
        }
      }, 100);
    }, []),
  );

  const handleSearchSelect = async (selectedResult: SearchResult) => {
    try {
      const { osm_id, osm_type, name } = selectedResult.properties;

      const coordinates = selectedResult.geometry.coordinates;

      if (!osm_id || !osm_type) {
        console.error(
          'No OSM ID or OSM type found in the selected search result',
        );
      } else {
        router.push({
          pathname: '/destination/query',
          query: {
            osmType: osm_type,
            osmId: osm_id,
            name,
          },
        });
      }
    } catch (error) {
      console.error('errorrrrrr', error);
    }
  };

  return (
    <RStack
      style={{
        paddingTop: 24,
        backgroundColor: currentTheme.colors.background,
      }}
    >
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
      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <PlacesAutocomplete
          onSelect={handleSearchSelect}
          placeholder="Search for a place"
          ref={ref}
          shouldNavigateBackOnClear={Platform.OS !== 'web'}
        />
      </SafeAreaView>
      {/* Add search virtual list for feed, packs, trips, places with prop to determine which to display */}
    </RStack>
  );
}
