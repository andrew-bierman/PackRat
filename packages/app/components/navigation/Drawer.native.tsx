import { Drawer as ExpoDrawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { NavigationList } from './NavigationList';

export function Drawer() {
  const styles = useCustomStyles(loadStyles);

  return (
    <ExpoDrawer
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        drawerStyle: styles.drawerStyles,
        headerShown: false,
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <NavigationList
              itemStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 8,
              }}
            />
          </DrawerContentScrollView>
        );
      }}
    />
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
    drawerStyles: {
      backgroundColor: currentTheme.colors.background,
    },
    safeArea: {
      backgroundColor: currentTheme.colors.background,
    },
    container: {
      width: '100%',
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      width: '100%',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoWrapper: {
      marginHorizontal: 10,
    },
    logoText: {
      color: currentTheme.colors.white,
      fontSize: 38,
      fontWeight: '900',
    },
    menuBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      height: 60,
    },
    menuBarItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingHorizontal: 12,
    },
    menuBarItemText: {
      color: currentTheme.colors.white,
      fontSize: 18,
    },
    drawerTrigger: {},
    menuBarItemActive: {
      // Apply styles for the active item
      // ...
    },
    menuBarItemTextActive: {
      // Apply styles for the active item's text
      // ...
    },
    menuBarItemSelected: {
      // Apply styles for the selected item
      // ...
    },
    menuBarItemTextSelected: {
      // Apply styles for the selected item's text
      // ...
    },
  };
};
