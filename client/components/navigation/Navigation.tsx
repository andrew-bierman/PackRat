import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { AuthStateListener } from '../../auth/AuthStateListener';
import SVGLogoComponent from '../../components/logo';
import { Drawer } from './Drawer';
import useCustomStyles from '~/hooks/useCustomStyles';
import { useIsMobileView } from '~/hooks/common';
import { useNavigate } from '~/hooks/navigation';
import { useAuthUser } from '~/hooks/user/useAuthUser';
import { NavigationList } from './NavigationList';

export const Navigation = () => {
  const user = useAuthUser();
  const isMobileView = useIsMobileView();
  const styles = useCustomStyles(loadStyles);
  const navigate = useNavigate();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {user && <AuthStateListener />}
        <View style={styles.header}>
          <TouchableOpacity
            key={'logo-nav'}
            style={styles.logoContainer}
            onPress={() => navigate('/')}
          >
            <View style={styles.logoWrapper}>
              <SVGLogoComponent width={48} height={48} fill="#fff" />
            </View>
            <Text style={styles.logoText}>PackRat</Text>
          </TouchableOpacity>

          {isMobileView ? (
            <Drawer />
          ) : (
            <View style={styles.menuBar}>
              <NavigationList />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;

  return {
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
