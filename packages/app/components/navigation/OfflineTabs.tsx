import React, { useContext } from 'react';
import { Tabs as ExpoTabs } from 'expo-router/tabs';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { usePathname } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import useTheme from 'app/hooks/useTheme';
import { RIconButton } from '@packrat/ui';
import ThemeContext from '../../context/theme';
import { View } from 'react-native';
import { Stack } from 'tamagui';
import { Backpack } from '@tamagui/lucide-icons';

export const OfflineTabs = () => {
  const { isDark, enableDarkMode, enableLightMode } = useContext(ThemeContext);

  const { currentTheme } = useTheme();
  const iconName = isDark ? 'moon' : 'sun';
  const iconColor = isDark ? 'white' : 'black';
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
          name="maps"
          options={{
            headerShown: false,
            tabBarLabel: 'Maps',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" size={size} color={color} />
            ),
          }}
        />
        <ExpoTabs.Screen
          name="pack"
          options={{
            headerShown: false,
            tabBarLabel: 'Packs',
            tabBarIcon: ({ size, color }) => (
              <Backpack size={size} color={color} />
            ),
          }}
        />
      </ExpoTabs>
    </>
  );
};
