import React, { useContext } from 'react';
import { Tabs as ExpoTabs } from 'expo-router/tabs';
import { TabList } from './TabList';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Stack, usePathname } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import useTheme from 'app/hooks/useTheme';
import { StatusBar } from 'expo-status-bar';
import { RIconButton } from '@packrat/ui';
import ThemeContext from '../../context/theme';
import { View } from 'react-native';
import FAB from '../../components/Fab/Fab';

export const Tabs = () => {
  const formatHeaderTitle = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(Boolean);
    const title = pathParts[pathParts.length - 1]
      ?.replace(/-/g, ' ')
      ?.replace(/\b\w/g, (l) => l.toUpperCase());

    return title || 'Stack';
  };
  const { isDark, enableDarkMode, enableLightMode } = useContext(ThemeContext);

  const { currentTheme } = useTheme();
  const iconName = isDark ? 'moon' : 'sun';
  const iconColor = isDark ? 'white' : 'black';
  const statusBarColor = isDark ? 'light' : 'dark';
  const handlePress = () => {
    if (isDark) {
      enableLightMode();
    } else {
      enableDarkMode();
    }
  };

  return (
    <>
      <ExpoTabs
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: currentTheme.colors.background,
            borderTopWidth: 0,
          },
          headerShown: false,
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <RIconButton
                backgroundColor="transparent"
                icon={<Feather name={iconName} size={24} color={iconColor} />}
                onPress={handlePress}
              />
              <DrawerToggleButton tintColor={currentTheme.colors.text} />
            </View>
          ),
          headerTitleStyle: {
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: currentTheme.colors.background,
          },
          headerTintColor: currentTheme.colors.tertiaryBlue,
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
            href: null,
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
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
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
            href: null,
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </ExpoTabs>
      <FAB />
      <StatusBar style={statusBarColor} />
    </>
  );
};
