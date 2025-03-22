import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { ProductsScreen } from 'app/modules/item';
import { useAtom } from 'jotai';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';
import { useRouterSettings } from 'app/hooks/router';
import { searchQueryAtom } from 'app/modules/feed/atoms';

export default function ProductsPage() {
  const { currentTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const { stackScreenOptionsHeaderSettings } = useRouterSettings();

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
          ...stackScreenOptionsHeaderSettings,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <ProductsScreen />
    </>
  );
}
