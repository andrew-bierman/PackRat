import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouterSettings } from 'app/hooks/router';
import { Stack } from 'expo-router';
import React from 'react';
import useTheme from 'app/hooks/useTheme';
export default function StackLayout() {
  const { layoutStackScreenOptionsHeaderSettings } = useRouterSettings();
  const { currentTheme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <DrawerToggleButton tintColor={currentTheme.colors.text} />
        ),
        ...layoutStackScreenOptionsHeaderSettings,
        headerBlurEffect: 'systemChromeMaterial',
      }}
    />
  );
}
