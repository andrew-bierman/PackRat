import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { ProductsScreen } from 'app/modules/item';
import { placesAutocompleteSearchAtom } from 'app/components/PlacesAutocomplete/usePlacesAutoComplete';
import { useAtom } from 'jotai';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

export default function ProductsPage() {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(placesAutocompleteSearchAtom);
  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Products</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'Products',
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),
          headerSearchBarOptions: {
            placeholder: 'Search products',
            headerIconColor: currentTheme.colors.text,
            hideWhenScrolling: false,
            inputType: 'text',
            textColor:
              Platform.OS === 'android' ? currentTheme.colors.text : undefined,
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
      <ProductsScreen />
    </>
  );
}
