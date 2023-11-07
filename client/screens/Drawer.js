import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Link, useRouter, usePathname } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import useTheme from '../hooks/useTheme';
import { useSession } from '../context/auth';
import useCustomStyles from '~/hooks/useCustomStyles';
import { signOut } from '../store/authStore';

const Drawer = ({
  isDrawerOpen,
  toggleDrawer,
  navigationItems,
  position = 'left',
}) => {
  const dispatch = useDispatch();
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();
  const pathName = usePathname();
  const [navBarWidth, setNavBarWidth] = useState(null);
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get('window').width < 1024,
  );
  const user = useSelector((state) => state.auth.user);
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const { sessionSignOut } = useSession();

  const isLeft = position === 'left';
  const isRight = position === 'right';

  const drawerStyle = {
    left: isLeft ? 0 : null,
    right: isRight ? 0 : null,
  };

  const navigateTo = useCallback(
    (href) => {
      if (href === '/logout') {
        dispatch(signOut());
        sessionSignOut();
      } else {
        toggleDrawer();
        setSelectedNavItem(href);
        setIsLoading(true); // Start loading
        if (!user && href === '/') return;
        setTimeout(() => {
          router.push(href);
          setIsLoading(false); // Stop loading after a delay
        }, 0); // Adjust the delay as needed
      }
    },
    [dispatch, router],
  );

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
          key={`${item.href}nav${index}`}
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

  const renderNavigationItems = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity style={styles.closeButton}>
          <AntDesign
            name="close"
            size={24}
            color={currentTheme.colors.iconColor}
            onPress={toggleDrawer}
          />
        </TouchableOpacity>
        {navigationItems?.map((item) => (
          <TouchableOpacity
            key={item.href}
            style={styles.navigationItem}
            onPress={() => navigateTo(item.href)}
          >
            {renderNavigationItem(item)}
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    );
  };

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
  }, [isMobileView]);

  return (
    <Modal
      visible={isDrawerOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleDrawer}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.fullScreenTouchable}
          onPress={toggleDrawer}
        />
        <View style={[styles.drawerContainer, drawerStyle]}>
          {renderNavigationItems()}
        </View>
      </View>
    </Modal>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    modalOverlay: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    fullScreenTouchable: {
      flex: 1,
    },
    drawerContainer: {
      backgroundColor: currentTheme.colors.background,
      width: '70%',
      position: 'absolute',
      top: 0,
      borderRightWidth: 1,
      height: '100%',
      padding: 16,
    },
    navigationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      with: '100%',
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
      margin: 4,
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
      padding: 12,
    },
    menuBarItemText: {
      color: currentTheme.colors.text,
      fontSize: 18,
    },
  };
};

export default Drawer;
