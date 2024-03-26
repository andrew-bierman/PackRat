import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { RButton, Container } from '@packrat/ui';
import { useIsMobileView } from 'app/hooks/common';
import { useNavigate } from 'app/hooks/navigation';
import { NavigationList } from '../NavigationList';
import { Drawer } from '../Drawer';
import { useScrollTop } from 'app/hooks/common/useScrollTop';
import { useScreenWidth } from 'app/hooks/common';
import useTheme from 'app/hooks/useTheme';

export const Navbar = () => {
  const { currentTheme } = useTheme();
  const scrollTop = useScrollTop();
  const { screenWidth } = useScreenWidth();
  const isScrolled = !!scrollTop;
  const styles = useMemo(() => {
    return StyleSheet.create(loadStyles(currentTheme, isScrolled, screenWidth));
  }, [isScrolled, currentTheme, screenWidth]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Container>
          <View style={styles.container}>
            <Text style={styles.logoText}>PackRat</Text>
            <Drawer />
          </View>
        </Container>
      </SafeAreaView>
    </>
  );
};

const NavbarStyles = {
  floatingBg: 'rgba(52,168,154, 0.7)',
  floatingRadius: 25,
  floatingBlur: 'blur(2px)',
  transition: 'all 0.2s ease-in-out',
  floatingSpacing: 4,
};

const loadStyles = (currentTheme, isScrolled, screenWidth) => {
  const isWeb = Platform.OS === 'web';
  const isFloating = isWeb && isScrolled;
  const backgroundColor = isFloating
    ? NavbarStyles.floatingBg
    : currentTheme.colors.background;

  return {
    drawerStyles: {
      backgroundColor: currentTheme.colors.background,
    },
    safeArea: {
      backgroundColor,
      ...(isWeb
        ? {
            position: 'fixed',
            top: 0,
            left: screenWidth <= 1140 ? 0 : 'calc(50% - 570px)',
            zIndex: 100,
          }
        : {}),
      width: '100%',
      maxWidth: 1140,
      margin: 'auto',
      transition: NavbarStyles.transition,
      ...(isFloating
        ? {
            backdropFilter: NavbarStyles.floatingBlur,
            marginTop: NavbarStyles.floatingSpacing,
            padding: NavbarStyles.floatingSpacing,
            borderRadius: NavbarStyles.floatingRadius,
          }
        : {}),
    },
    container: {
      width: '100%',
      maxWidth: '100%', // Ensure container does not exceed the viewport width
      flex: 1, // Ensure container can grow to fit content
      backgroundColor,
      borderRadius: NavbarStyles.floatingRadius,
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
      color: currentTheme.colors.text,
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
