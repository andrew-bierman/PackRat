import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import About from 'app/screens/about';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

/**
 * Renders the AboutRoute component.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function AboutRoute() {
  const { currentTheme } = useTheme();

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>About</title>
          <meta name="description" content="About" />
        </Head>
      )}
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: 'About',
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
          ),

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
      <About />
    </>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingBottom: 120,
  },
});
