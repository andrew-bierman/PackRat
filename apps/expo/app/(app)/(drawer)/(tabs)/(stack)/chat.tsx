import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';
import ChatNative from 'app/components/chat/ChatNative';
import useTheme from 'app/hooks/useTheme';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Chat() {
  const { currentTheme } = useTheme();

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <title>Chat</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          title: 'Chat',
          headerRight: () => (
            <DrawerToggleButton tintColor={currentTheme.colors.tertiaryBlue} />
          ),

          headerStyle: {
            backgroundColor: currentTheme.colors.background,
          },
          headerTitleStyle: {
            fontSize: 24,
          },
          headerTintColor: currentTheme.colors.tertiaryBlue,
        }}
      />
      <ChatNative />
    </>
  );
}
