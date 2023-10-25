import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  useRootNavigationState,
  Stack,
  Slot,
  useRouter,
  useSegments,
  router,
  Redirect,
  usePathname,
} from 'expo-router';
import { darkTheme, theme } from '../theme';
import { Box } from 'native-base';

import LandingPage from 'components/landing_page';

import Dashboard from 'screens/dashboard';
import useTheme from 'hooks/useTheme';
import { current } from '@reduxjs/toolkit';
import Head from 'expo-router/head';

export default function Index() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();
  const path = usePathname();

  const user = useSelector((state) => state.auth.user);

  const mutualStyles = {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
  };

  if (Platform.OS === 'web') {
    return (
      <>
        <Head>
          <title>PackRat</title>
        </Head>
        <Stack.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: 'Home',
            name: 'Home',
          }}
        />
        <Box style={mutualStyles}>{user ? <Dashboard /> : <LandingPage />}</Box>
      </>
    );
  } else {
    return user ? <Redirect href="/dashboard" /> : <LandingPage />;
  }
}
