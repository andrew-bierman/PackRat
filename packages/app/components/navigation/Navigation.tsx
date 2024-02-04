import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AuthStateListener } from '../../auth/AuthStateListener';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useIsMobileView } from 'app/hooks/common';
import { useNavigate } from 'app/hooks/navigation';
import { useAuthUser } from 'app/hooks/user/useAuthUser';
import { NavigationList } from './NavigationList';
import { Button } from 'tamagui';
import SVGLogoComponent from '../../components/logo';
import { Drawer } from './Drawer';
import { EvilIcons } from '@expo/vector-icons';
import useTheme from '../../hooks/useTheme';

export const Navigation = () => {
  const user = useAuthUser();
  const isMobileView = useIsMobileView();
  const { currentTheme } = useTheme();
  const styles = useCustomStyles(loadStyles);
  const navigate = useNavigate();
  return isMobileView ? (
    <>
      {Platform.OS === 'web' ? (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.logoText}>PackRat</Text>
            <Drawer />
          </View>
        </SafeAreaView>
      ) : (
        <Drawer />
      )}
    </>
  ) : (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {user && <AuthStateListener />}
        <View style={styles.header}>
          <Button
            key={'logo-nav'}
            style={styles.logoContainer}
            onPress={() => navigate('/')}
            variant="outlined"
            chromeless
          >
            <View style={styles.logoWrapper}>
              {/* FIX ME */}
              {Platform.OS === 'web' ? (
                // <SVGLogoComponent />
                <></>
              ) : (
                // <Text style={styles.logoText}>PackRat</Text>
                <></>
              )}
            </View>
            <Text style={styles.logoText}>PackRat</Text>
          </Button>
          <View style={styles.menuBar}>
            <NavigationList />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
