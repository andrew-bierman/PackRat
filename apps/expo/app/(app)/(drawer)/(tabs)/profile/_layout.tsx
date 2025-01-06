import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouterSettings } from 'app/hooks/router';
import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <DrawerToggleButton />,
        headerBlurEffect: 'systemChromeMaterial',
        title: 'Profile',
      }}
    />
  );
}
