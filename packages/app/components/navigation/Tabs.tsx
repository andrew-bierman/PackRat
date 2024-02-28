import React from 'react';
import { Tabs as ExpoTabs } from 'expo-router/tabs';
import { TabList } from './TabList';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack, usePathname } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';

export const Tabs = () => {
  const formatHeaderTitle = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(Boolean);
    const title = pathParts[pathParts.length - 1]
      ?.replace(/-/g, ' ')
      ?.replace(/\b\w/g, (l) => l.toUpperCase());

    return title || 'Stack';
  };

  return (
    <ExpoTabs
      screenOptions={{
        headerShown: false,
        headerRight: () => <DrawerToggleButton />,
        tabBarBackground: () => (
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            intensity={50} // Adjust the blur intensity
            tint="light" // TODO make this dynamic
          />
        ),
      }}
    >
      <ExpoTabs.Screen
        name="index"
        options={{
          headerShown: true,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <ExpoTabs.Screen
        name="feed/index"
        options={{
          headerShown: true,
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="newspaper"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <ExpoTabs.Screen
        name="profile/index"
        options={{
          headerShown: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />

      <ExpoTabs.Screen
        name="(stack)"
        options={{
          href: null,
          headerShown: false,
          headerTitle: formatHeaderTitle(),
        }}
      />

      <ExpoTabs.Screen
        name="search"
        options={{
          headerShown: true,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
          // TODO implement in the header
          // header: () => (
          //   <SafeAreaView>
          //     <PlacesAutocomplete
          //       style={{ width: '100%' }}
          //       placeholder="Search for a place"
          //     />
          //   </SafeAreaView>
          // ),
        }}
      />

      {/* <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      /> */}
    </ExpoTabs>
  );
};
