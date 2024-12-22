import { Feather } from '@expo/vector-icons';
import { RIconButton } from '@packrat/ui';
import { DrawerToggleButton } from '@react-navigation/drawer';
import useTheme from 'app/hooks/useTheme';
import { usePathname } from 'expo-router';
import { Tabs as ExpoTabs } from 'expo-router/tabs';
import { StatusBar } from 'expo-status-bar';
import {
  BackpackIcon,
  HomeIcon,
  NewspaperIcon,
  SearchIcon,
  UserRoundIcon,
} from 'lucide-react-native';
import React, { useContext } from 'react';
import { View } from 'react-native';
import FAB from '../../components/Fab/Fab';
import ThemeContext from '../../context/theme';

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
        }}
      >
        <ExpoTabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <ExpoTabs.Screen
          name="feed"
          options={{
            href: 'feed',
            headerShown: false,
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, size, focused }) => (
              <NewspaperIcon size={size} color={color} />
            ),
          }}
        />
        <ExpoTabs.Screen
          name="packs"
          options={{
            href: 'packs',
            headerShown: false,
            tabBarLabel: 'Packs',
            tabBarIcon: ({ color, size }) => (
              <BackpackIcon size={size} color={color} />
            ),
          }}
        />
        <ExpoTabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <UserRoundIcon size={size} color={color} />
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
              <SearchIcon size={size} color={color} />
            ),
          }}
        />
      </ExpoTabs>
      <FAB />
      <StatusBar style={statusBarColor} />
    </>
  );
};
