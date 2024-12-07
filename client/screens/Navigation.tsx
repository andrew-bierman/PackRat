import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { AuthStateListener } from '../../client/auth/AuthStateListener';
import { theme } from '../theme';
import {
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

import SVGLogoComponent from '../components/logo';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../store/authStore';
import Drawer from './Drawer';
import { Link, useRouter, usePathname } from 'expo-router';
import { hexToRGBA } from '../utils/colorFunctions';
import useTheme from '../hooks/useTheme';

import useCustomStyles from '~/hooks/useCustomStyles';

const Navigation = () => {
  const router = useRouter();
  const pathName = usePathname();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get('window').width < 1024,
  );

  const [navBarWidth, setNavBarWidth] = useState(null);
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const hoverColor = hexToRGBA(currentTheme.colors.primary, 0.2);

  const styles = useCustomStyles(loadStyles);

  /**
   * Toggle the state of the drawer.
   *
   * @return {void} No return value.
   */
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const staticNavigationItems = useMemo(
    () => [
      {
        href: '/',
        icon: 'home',
        text: 'Home',
        iconSource: Entypo,
      },
    ],
    [],
  );

  const userNavigationItems = useMemo(
    () =>
      user
        ? [
            {
              href: '/feed',
              icon: 'newspaper-variant',
              text: 'Feed',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/trips',
              icon: 'routes',
              text: 'Trips',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/packs',
              icon: 'backpack',
              text: 'Packs',
              iconSource: MaterialIcons,
            },
            ...(Platform.OS != 'web'
              ? [
                  {
                    href: '/maps',
                    icon: 'map',
                    text: 'Downloaded Maps',
                    iconSource: Entypo,
                  },
                ]
              : []),
            {
              href: '/items',
              icon: 'tent',
              text: 'Items',
              iconSource: Fontisto,
            },
            {
              href: '/profile',
              icon: 'book',
              text: 'Profile',
              iconSource: FontAwesome,
            },
            {
              href: '/appearance',
              icon: 'theme-light-dark',
              text: 'Appearance',
              iconSource: MaterialCommunityIcons,
            },
            {
              href: '/about',
              icon: 'info',
              text: 'About',
              iconSource: MaterialIcons,
            },
            {
              href: 'logout',
              icon: 'logout',
              text: 'Logout',
              iconSource: MaterialIcons,
            },
          ]
        : [
            {
              href: 'sign-in',
              icon: 'login',
              text: 'Login',
              iconSource: MaterialIcons,
            },
            {
              href: 'register',
              icon: 'person-add',
              text: 'Register',
              iconSource: MaterialIcons,
            },
          ],
    [user],
  );
  const navigationItems = [...staticNavigationItems, ...userNavigationItems];

  const navigateTo = useCallback(
    (href) => {
      if (href === 'logout') {
        dispatch(signOut());
        sessionSignOut();
      } else {
        setIsDrawerOpen(false);
        setSelectedNavItem(href);
        setIsLoading(true); // Start loading

        setTimeout(() => {
          router.push(href);
          setIsLoading(false); // Stop loading after a delay
        }, 0); // Adjust the delay as needed
      }
    },
    [dispatch, router],
  );

  useEffect(() => {
    const handleScreenResize = () => {
      const isMobile =
        Dimensions.get('window').width < 1300 ||
        (navBarWidth < 1024 && !firstRender); // Adjust these values as needed
      setIsMobileView(isMobile);
      // update first render
      if (firstRender.current) {
        firstRender.current = false;
      }
    };

    const subscription = Dimensions.addEventListener(
      'change',
      handleScreenResize,
    );
    return () => {
      subscription.remove(); // Proper event listener cleanup
    };
  }, [navBarWidth]); // Add navBarWidth as a dependency to the effect

  const renderNavigationItem = useCallback(
    (item, index) => {
      const { icon, iconSource, text, href } = item;
      const IconComponent = iconSource || EvilIcons;

      const isCurrentPage = pathName === href; // compare the current route with the href
      const isSelected = selectedNavItem === href; // check if the item is selected

      const handleItemPress = () => {
        setSelectedNavItem(href);
        navigateTo(href);
      };

      // if ((href === 'profile' || href === 'logout') && !user) {
      //   return null; // Do not render the item if the user is not signed in
      // }

      return (
        <TouchableOpacity
          key={item.href + 'nav' + index}
          style={[
            styles.menuBarItem,
            isCurrentPage && styles.menuBarItemActive, // apply the active style if this is the current page
            isSelected && styles.menuBarItemSelected, // apply the selected style if this item is selected
          ]}
          onPress={handleItemPress}
          activeOpacity={0.7} // Set the activeOpacity to create a hover effect
        >
          <IconComponent
            name={icon}
            size={isMobileView ? 24 : 18}
            color={
              isCurrentPage || isSelected
                ? currentTheme.colors.iconColor
                : currentTheme.colors.iconColor
            } // change the color if this is the current page or selected item
            key={item.href + 'icon'}
          />
          <Text
            style={[
              styles.menuBarItemText,
              isCurrentPage && styles.menuBarItemTextActive, // apply the active style to the text if this is the current page
              isSelected && styles.menuBarItemTextSelected, // apply the selected style to the text if this item is selected
            ]}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
    },
    [user, selectedNavItem], // add any other dependencies that this function uses
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={styles.container}
        onLayout={(event) => setNavBarWidth(event.nativeEvent.layout.width)} // calculate the width of the navbar
      >
        {user && <AuthStateListener />}
        <View style={styles.header}>
          <TouchableOpacity
            key={'logo-nav'}
            style={styles.logoContainer}
            onPress={() => navigateTo('/')}
          >
            <View style={styles.logoWrapper}>
              <SVGLogoComponent
                // width={isMobileView ? 48 : 64}
                // height={isMobileView ? 48 : 64}
                width={48}
                height={48}
                fill="#fff"
              />
            </View>
            <Text style={styles.logoText}>PackRat</Text>
          </TouchableOpacity>

          {/* Trigger to open/close the drawer */}
          <View style={styles.drawerContainer}>
            {!isDrawerOpen && isMobileView && (
              <TouchableOpacity
                style={styles.drawerTrigger}
                onPress={toggleDrawer}
              >
                <EvilIcons
                  name={isDrawerOpen ? 'close' : 'navicon'}
                  size={isMobileView ? 36 : 24}
                  color={currentTheme.colors.iconColor}
                />
              </TouchableOpacity>
            )}
          </View>

          {isMobileView ? (
            <Modal
              visible={isDrawerOpen}
              animationType="slide"
              transparent={true}
            >
              <Drawer
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={toggleDrawer}
                navigationItems={navigationItems}
                position="right"
              />
            </Modal>
          ) : (
            // <ScrollView
            //   horizontal
            //   showsHorizontalScrollIndicator={false}
            //   contentContainerStyle={styles.menuBar}
            // >
            <View style={styles.menuBar}>
              {navigationItems?.map((item, index) =>
                renderNavigationItem(item, index),
              )}
            </View>
            // </ScrollView>
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
    drawerContainer: {},
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

export default Navigation;
