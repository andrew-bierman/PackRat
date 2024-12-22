import { DrawerToggleButton } from '@react-navigation/drawer';
import ChatNative from 'app/components/chat/ChatNative';
import useTheme from 'app/hooks/useTheme';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import React from 'react';
import { Platform } from 'react-native';

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
          headerRight: ({ tintColor }) => (
            <DrawerToggleButton tintColor={tintColor} />
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
