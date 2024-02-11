import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useIsMobileView } from 'app/hooks/common';
import { useNavigate } from 'app/hooks/navigation';
import { useAuthUser } from 'app/auth/hooks';
import { Button } from 'tamagui';
import { EvilIcons } from '@expo/vector-icons';
import SVGLogoComponent from 'app/components/logo';
import useTheme from 'app/hooks/useTheme';
import { DrawerActions } from '@react-navigation/native';

export default function StackLayout() {
  const user = useAuthUser();
  const isMobileView = useIsMobileView();
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const navigate = useNavigate();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => (
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Button
                  key={'logo-nav'}
                  style={styles.logoContainer}
                  onPress={() => navigate('/')}
                  variant="outlined"
                  chromeless
                >
                  <View style={styles.logoWrapper}>
                    <SVGLogoComponent width={48} height={48} fill="#fff" />
                  </View>
                  <Text style={styles.logoText}>PackRat</Text>
                </Button>
                <TouchableOpacity
                  style={styles.drawerTrigger}
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}
                >
                  <EvilIcons
                    name="navicon"
                    size={36}
                    color={currentTheme.colors.iconColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        ),
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
      color: currentTheme.colors.text,
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
      color: currentTheme.colors.text,
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
