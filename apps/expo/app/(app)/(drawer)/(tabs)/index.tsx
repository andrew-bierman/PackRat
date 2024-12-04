import React from 'react';
import { Platform, View } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { theme } from 'app/theme';
import { DashboardScreen } from 'app/modules/dashboard';
import useTheme from 'app/hooks/useTheme';
import { useAuthUser, LoginScreen } from 'app/modules/auth';
import Head from 'expo-router/head';
import { useOfflineStore } from 'app/atoms';

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
          {!user ? <LoginScreen /> : <DashboardScreen />}
        </View>
      )}
      {connectionStatus === 'offline' && <Redirect href="offline/maps" />}
    </>
  );
}
