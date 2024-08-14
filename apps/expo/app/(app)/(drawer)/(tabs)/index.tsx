import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { darkTheme, theme } from 'app/theme';
import LandingPage from 'app/components/landing_page';
import { DashboardScreen } from 'app/modules/dashboard';
import useTheme from 'app/hooks/useTheme';
import { useAuthUser } from 'app/auth/hooks';
import { current } from '@reduxjs/toolkit';
import Head from 'expo-router/head';
import Login from 'app/screens/LoginScreen';

export default function HomeScreen() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();

  const user = useAuthUser();

  const mutualStyles = {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
  };

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
      <View style={mutualStyles}>
        {!user ? <Login /> : <DashboardScreen />}
      </View>
    </>
  );
}
