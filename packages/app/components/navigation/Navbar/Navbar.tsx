import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { RButton, Container, RLink, RText } from '@packrat/ui';
import { useIsMobileView } from 'app/hooks/common';
import { useNavigate } from 'app/hooks/navigation';
import { NavigationList } from '../NavigationList';
import { Drawer } from '../Drawer';
import { useScrollTop } from 'app/hooks/common/useScrollTop';
import { useScreenWidth } from 'app/hooks/common';
import useTheme from 'app/hooks/useTheme';
import { RImage } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useResponsive from 'app/hooks/useResponsive';

export const Navbar = () => {
  const { currentTheme, enableDarkMode, enableLightMode, isLight } = useTheme();
  const toggleTheme = async () => {
    console.log(isLight);
    if (isLight) {
      return enableDarkMode();
    }
    enableLightMode();
  };
  const scrollTop = useScrollTop();
  const { screenWidth } = useScreenWidth();
  const isScrolled = !!scrollTop;
  const { xxs, xs, sm, md, lg } = useResponsive();
  const styles = useMemo(() => {
    return StyleSheet.create(
      loadStyles(currentTheme, isScrolled, screenWidth, xxs, xs, sm, md, lg),
    );
  }, [isScrolled, currentTheme, screenWidth]);
  const navigate = useNavigate();

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Container>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <RImage
                  source={{
                    // TODO: Update this to use the PackRat logo from the assets folder
                    uri: 'https://github.com/andrew-bierman/PackRat/blob/main/packages/app/assets/packrat_icon.png?raw=true',
                    width: 40,
                    height: 40,
                  }}
                  width={40}
                  height={40}
                  style={styles.logo}
                  alt="PackRat Logo"
                  onClick={() => {
                    navigate('/');
                  }}
                />
                <RText
                  style={{
                    fontSize: 38,
                    fontWeight: 'bolder',
                    cursor: 'pointer',
                  }}
                  onPress={() => {
                    navigate('/');
                  }}
                >
                  PackRat
                </RText>
              </View>
              {/* <Text
                style={styles.logoText}
                onPress={() => {
                  navigate('/');
                }}
              >
                PackRat
              </Text> */}
            </View>
            <View style={styles.navbarThird}>
              <MaterialCommunityIcons
                onPress={toggleTheme}
                name="theme-light-dark"
                size={24}
                style={{
                  color: currentTheme.colors.textPrimary,
                  cursor: 'pointer',
                }}
              />
              <RLink href="/sign-in">
                <RText style={styles.loginButton}>Login</RText>
              </RLink>
              <Drawer />
            </View>
          </View>
        </Container>
      </SafeAreaView>
    </View>
  );
};

const loadStyles = (
  currentTheme,
  isScrolled,
  screenWidth,
  xxs,
  xs,
  sm,
  md,
  lg,
) => {
  const NavbarStyles = {
    floatingBg: currentTheme.colors.floatingBg,
    floatingRadius: 30,
    floatingBlur: 'blur(10px)',
    transition: 'all 0.2s ease-in-out',
    floatingSpacing: 1,
  };

  const isWeb = Platform.OS === 'web';
  const isFloating = isWeb && isScrolled;
  const backgroundColor = isFloating
    ? NavbarStyles.floatingBg
    : currentTheme.colors.navbarPrimaryBackground;

  return StyleSheet.create({
    navbarThird: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    mainContainer: {
      backgroundColor: '#f6f6f6',
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
    },
    drawerStyles: {
      backgroundColor: currentTheme.colors.background,
    },
    safeArea: {
      backgroundColor,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      borderRadius: NavbarStyles.floatingRadius,
      transition: NavbarStyles.transition,
      ...Platform.select({
        web: {
          ...(isFloating
            ? {
                backdropFilter: NavbarStyles.floatingBlur,
                marginTop: NavbarStyles.floatingSpacing,
                padding: NavbarStyles.floatingSpacing,
                paddingTop: 6,
                paddingBottom: 6,
                boxShadow: currentTheme.colors.navbarBoxShadow,
              }
            : {}),
          position: 'fixed' as 'fixed' | 'relative',
          top: 0,
          // right: 0,
          // left: 0,
          zIndex: 100,
          width:
            Platform.OS === 'web'
              ? xxs || xs || sm
                ? '100vw'
                : '90vw'
              : xxs || xs || sm
                ? '100%'
                : '90%',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    },
    container: {
      width: '100%',
      maxWidth: '100%', // Ensure container does not exceed the viewport width
      flex: 1, // Ensure container can grow to fit content
      backgroundColor,
      borderRadius: NavbarStyles.floatingRadius,
      paddingHorizontal: 16,
      paddingVertical: 4,
      flexDirection: 'row', // Keep flexDirection as row for alignment
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap', // Allow items to wrap
      height: 'auto', // Ensure container takes full height of its container
      // padding: 16,
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
    logo: {
      cursor: 'pointer',
      backgroundColor: 'black',
      borderRadius: 8,
      // filter: 'drop-shadow(0 0 1px #45607d)',
    },
    menuBar: {
      color: '#315173',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // paddingHorizontal: 16,
      // flex: 1, // Keep flexible but consider its behavior with wrapping,
      // flexWrap: 'wrap', // Allow items to wrap
    },
    drawerTrigger: {},
    loginButton: {
      backgroundColor: 'transparent',
      color: currentTheme.colors.textPrimary,
      borderWidth: 1,
      borderColor: currentTheme.colors.cardBorderPrimary,
      overflow: 'hidden',
      padding: 8,
      borderRadius: 4,
      fontSize: 16,
      fontWeight: 'normal',
    },
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
  });
};
