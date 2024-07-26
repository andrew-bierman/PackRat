import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { useIsMobileView } from 'app/hooks/common';
import { useNavigate } from 'app/hooks/navigation';
import { useAuthUser } from 'app/auth/hooks';
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
      maxWidth: '100%', // Ensure container does not exceed the viewport width
      flex: 1, // Ensure container can grow to fit content
      backgroundColor: currentTheme.colors.background,
      flexDirection: 'row', // Keep flexDirection as row for alignment
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap', // Allow items to wrap
      height: 60, // Ensure container takes full height of its container
      padding: 16,
    },
    header: {
      flexDirection: 'row', // Keep flexDirection as row for initial alignment
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%', // Ensure header takes full width of its container
      flexWrap: 'wrap', // Allow header items to wrap
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoWrapper: {
      marginHorizontal: 10,
    },
    logoText: {
      color: currentTheme.colors.textPrimary,
      fontSize: 38,
      fontWeight: '900',
    },
    menuBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      flex: 1, // Keep flexible but consider its behavior with wrapping,
      flexWrap: 'wrap', // Allow items to wrap
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
