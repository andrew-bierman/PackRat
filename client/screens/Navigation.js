import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { AuthStateListener } from "../../client/auth/AuthStateListener";
import { theme } from "../theme";
import {
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import SVGLogoComponent from "../components/logo";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/authStore";
import Drawer from "./Drawer";
import { Link, useRouter } from "expo-router";

const Navigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    Dimensions.get("window").width < 768
  );

  const [navBarWidth, setNavBarWidth] = useState(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const navigationItems = useMemo(
    () => [
      {
        href: "/",
        icon: "home",
        text: "Home",
        iconSource: Entypo,
      },
      ...(user
        ? [
            {
              href: "/feed",
              icon: "newspaper-variant",
              text: "Feed",
              iconSource: MaterialCommunityIcons,
            },
            {
              href: "/trips",
              icon: "routes",
              text: "Trips",
              iconSource: MaterialCommunityIcons,
            },
            {
              href: "/packs",
              icon: "backpack",
              text: "Packs",
              iconSource: MaterialIcons,
            },
            {
              href: "/about",
              icon: "info",
              text: "About",
              iconSource: MaterialIcons,
            },
            {
              href: "profile",
              icon: "book",
              text: "Profile",
              iconSource: FontAwesome,
            },
            {
              href: "logout",
              icon: "logout",
              text: "Logout",
              iconSource: MaterialIcons,
            },
          ]
        : [
            {
              href: "sign-in",
              icon: "login",
              text: "Login",
              iconSource: MaterialIcons,
            },
            {
              href: "register",
              icon: "person-add",
              text: "Register",
              iconSource: MaterialIcons,
            },
          ]),
    ],
    [user]
  );

  const navigateTo = (href) => {
    // Implement navigation logic here
    if (href === "logout") {
      dispatch(signOut());
    } else {
      setIsDrawerOpen(false);
      router.push(href);
    }
  };

  useEffect(() => {
    const handleScreenResize = () => {
      setIsMobileView(Dimensions.get("window").width < navBarWidth);
    };

    Dimensions.addEventListener("change", handleScreenResize);
    return () => {
      Dimensions.removeEventListener("change", handleScreenResize);
    };
  }, [navBarWidth]);

  const renderNavigationItem = useCallback(
    (item) => {
      const { icon, iconSource, text, href } = item;
      const IconComponent = iconSource || EvilIcons;

      if ((href === "profile" || href === "logout") && !user) {
        return null; // Do not render the item if the user is not signed in
      }

      return (
        <TouchableOpacity
          key={item.href}
          style={styles.menuBarItem}
          onPress={() => navigateTo(item.href)}
        >
          <IconComponent
            name={icon}
            size={isMobileView ? 24 : 18}
            color={theme.colors.iconColor}
            key={item.href + "icon"}
          />
          <Text style={styles.menuBarItemText}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [user, navigateTo, isMobileView] // add any other dependencies that this function uses
  );

  return (
    <View
      style={styles.container}
      onLayout={(event) => setNavBarWidth(event.nativeEvent.layout.width)} // calculate the width of the navbar
    >
      {user && <AuthStateListener />}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <SVGLogoComponent
              width={isMobileView ? 48 : 64}
              height={isMobileView ? 48 : 64}
              fill="#fff"
            />
          </View>
          <Text style={styles.logoText}>PackRat</Text>
        </View>

        {/* Trigger to open/close the drawer */}
        <View style={styles.drawerContainer}>
          {!isDrawerOpen && isMobileView && (
            <TouchableOpacity
              style={styles.drawerTrigger}
              onPress={toggleDrawer}
            >
              <EvilIcons
                name={isDrawerOpen ? "close" : "navicon"}
                size={isMobileView ? 36 : 24}
                color={theme.colors.iconColor}
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
              toggleDrawer={toggleDrawer}
              handleSignOut={() => {}}
              navigationItems={navigationItems}
              navigateTo={navigateTo}
              renderNavigationItem={renderNavigationItem}
            />
          </Modal>
        ) : (
          <View style={styles.menuBar}>
            {navigationItems.map((item) => renderNavigationItem(item))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    width: "100%", // This will make sure your header take all available space
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoWrapper: {
    marginHorizontal: 10,
  },
  logoText: {
    color: theme.colors.text,
    fontSize: 48,
    fontWeight: "900",
  },
  menuBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    flexWrap: "wrap",
  },
  menuBarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
  },
  menuBarItemText: {
    color: theme.colors.text,
    fontSize: 18,
  },
  drawerContainer: {
    // Add your styles here if needed
  },
  drawerTrigger: {
    // Remove the marginLeft: "auto"
  },
});

export default Navigation;
