import { useOfflineStore } from 'app/atoms';
import useTheme from 'app/hooks/useTheme';
import { useAuthUser } from 'app/modules/auth';
import { theme } from 'app/theme';
import { Redirect, Stack } from 'expo-router';
import Head from 'expo-router/head';
import { useAtom } from 'jotai';
import React from 'react';
import { Platform } from 'react-native';

import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import { LoginScreen } from 'app/modules/auth';
import { DashboardScreen } from 'app/modules/dashboard';
import { View } from 'tamagui';

export default function HomeScreen() {
  const { currentTheme = theme } = useTheme();

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
        }}
      />
      {connectionStatus === 'connected' && (
        <View style={mutualStyles}>
          {!user ? (
            <LoginScreen />
          ) : (
            <>
              {/* Dashboard or Search Results */}
              <DashboardScreen />
            </>
          )}
        </View>
      )}
      {connectionStatus === 'offline' && <Redirect href="offline/maps" />}
    </>
  );
}
