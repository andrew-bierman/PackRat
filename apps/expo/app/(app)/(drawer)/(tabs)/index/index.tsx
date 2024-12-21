import { useOfflineStore } from 'app/atoms';
import { SearchResults } from 'app/components/SearchInput/SearchResults';
import { useRouter } from 'app/hooks/router';
import useTheme from 'app/hooks/useTheme';
import { LoginScreen, useAuthUser } from 'app/modules/auth';
import { DashboardScreen } from 'app/modules/dashboard';
import { theme } from 'app/theme';
import { Redirect, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';

import { PlaceItem } from 'app/components/PlacesAutocomplete/PlacesAutocomplete';
import {
  placesAutocompleteSearchAtom,
  usePlacesAutoComplete,
} from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';

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

function NativeHomeScreen() {
  const user = useAuthUser();
  const router = useRouter();
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);

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
  const {
    data: searchResults,
    handleSelect,
    search,
    setSearch,
  } = usePlacesAutoComplete(handleSearchSelect);

  const [isFocused, setIsFocused] = useState(false); // Track focus state for input

  console.log('searchResults', searchResults);

  const mutualStyles = {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
  };

  const DashboardWithNativeSearch = () => {
    if (searchQuery) {
      return (
        <SearchResults
          results={searchResults}
          onResultClick={(result) => {
            handleSelect(result); // Handle the selection logic
            setSearchQuery(''); // Clear search query
          }}
          resultItemComponent={<PlaceItem />} // Custom item rendering
          isVisible={true}
        />
      );
    }
    return <DashboardScreen />;
  };

  return (
    <View style={mutualStyles}>
      {!user ? (
        <LoginScreen />
      ) : (
        <>
          {/* Dashboard or Search Results */}
          <DashboardWithNativeSearch />
        </>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();

  const user = useAuthUser();
  const { connectionStatus } = useOfflineStore();

  const mutualStyles = {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
  };

  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>PackRat</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          title: 'Home',
          headerSearchBarOptions: {
            placeholder: 'Search by park, city, or trail',
            hideWhenScrolling: false,
            inputType: 'text',
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      {connectionStatus === 'connected' && <NativeHomeScreen />}
      {connectionStatus === 'offline' && <Redirect href="offline/maps" />}
    </>
  );
}
