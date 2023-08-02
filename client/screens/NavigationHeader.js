import { View, StyleSheet, Image, Text } from "react-native";

import { Link } from "expo-router";

import { Desktop, Tablet, Mobile } from "../media";
import { useAuth } from "../auth/provider";

import { theme } from "../theme";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import packratlogo from "../assets/packrat_icon.png";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AuthStateListener } from "../../client/auth/AuthStateListener";
import { signOut } from "../store/authStore";
import SVGLogoComponent from "../components/logo";
import UseTheme from "../hooks/useTheme";
const MutualContent = ({ desktopContainer, desktopNav, isMobile }) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { signOut, user } = useAuth();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const user = useSelector((state) => state.auth.user);

  return user ? (
    <View style={desktopContainer}>
      <AuthStateListener />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        {/* <Image
          style={isMobile ? styles.smallLogo : styles.logo}
          source={packratlogo}
        /> */}
        <View style={{ margin: "10px" }}>
          <SVGLogoComponent
            width={isMobile ? 48 : 64}
            height={isMobile ? 48 : 64}
            fill="#fff"
          />
        </View>
        <Text
          style={{
            color: currentTheme.colors.text,
            fontSize: isMobile ? 28 : 48,
            fontWeight: 900,
          }}
        >
          PackRat
        </Text>
      </View>
      {isMobile ? (
        <Link href="/drawer">
          <EvilIcons
            name="navicon"
            size={48}
            color={currentTheme.colors.iconColor}
          />
        </Link>
      ) : (
        <View style={desktopNav}>
          <Link href="/">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <Entypo
                name="home"
                size={24}
                color={currentTheme.colors.iconColor}
              />
              <Text>Home</Text>
            </View>
          </Link>
          <Link href="/feed">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <MaterialCommunityIcons
                name="newspaper-variant"
                size={24}
                color={currentTheme.colors.iconColor}
              />

              <Text>Feed</Text>
            </View>
          </Link>
          <Link href="/trips">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <MaterialCommunityIcons
                name="routes"
                size={24}
                color={currentTheme.colors.iconColor}
              />
              <Text>Trips</Text>
            </View>
          </Link>
          <Link href="/packs">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <MaterialIcons
                name="backpack"
                size={24}
                color={currentTheme.colors.iconColor}
              />

              <Text>Packs</Text>
            </View>
          </Link>
          <Link href="/about">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <MaterialIcons
                name="info"
                size={24}
                color={currentTheme.colors.iconColor}
              />
              <Text>About</Text>
            </View>
          </Link>
          <Link href="profile">
            <View style={isMobile ? styles.mobileLink : styles.link}>
              <FontAwesome
                name="book"
                size={24}
                color={currentTheme.colors.iconColor}
              />
              <Text>Profile</Text>
            </View>
          </Link>
          <View style={isMobile ? styles.mobileLink : styles.link}>
            <MaterialIcons
              name="logout"
              size={24}
              color={currentTheme.colors.iconColor}
            />
            <Text style={{ color: "white" }} onPress={() => handleSignOut()}>
              Logout
            </Text>
          </View>
        </View>
      )}
    </View>
  ) : (
    <View style={desktopNav}>
      <Image
        style={isMobile ? styles.smallLogo : styles.logo}
        source={packratlogo}
      />
      <Text
        style={{
          color: currentTheme.colors.text,
          fontSize: isMobile ? 28 : 48,
          fontWeight: 900,
        }}
      >
        PackRat
      </Text>
      <Link href="/">
        <View style={isMobile ? styles.mobileLink : styles.link}>
          <Entypo name="home" size={24} color={currentTheme.colors.iconColor} />
          <Text>Home</Text>
        </View>
      </Link>
      <Link href="/sign-in">
        <View style={isMobile ? styles.mobileLink : styles.link}>
          <MaterialIcons
            name="login"
            size={24}
            color={currentTheme.colors.iconColor}
          />
          <Text>Sign In</Text>
        </View>
      </Link>
    </View>
  );
};

export default function Navigation() {
  return (
    <View style={{ width: "100%" }}>
      <Desktop>
        <MutualContent
          desktopContainer={styles.desktopContainer}
          desktopNav={styles.desktopNav}
        />
      </Desktop>
      <Tablet>
        <MutualContent
          desktopContainer={styles.mobileContainer}
          desktopNav={styles.desktopNav}
          isMobile={true}
        />
      </Tablet>
      <Mobile>
        <MutualContent
          desktopContainer={styles.mobileContainer}
          desktopNav={styles.desktopNav}
          isMobile={true}
        />
      </Mobile>
    </View>
  );
}

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.background,
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },

  desktopContainer: {
    backgroundColor: theme.colors.background,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingHorizontal: 90,
  },

  mobileContainer: {
    backgroundColor: theme.colors.background,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    position: "relative",
    // height: "300px",
  },

  desktopNav: {
    flexDirection: "row",
    gap: 15,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },

  logo: {
    width: 75,
    height: 75,
    marginLeft: 20,
    marginTop: 10,
  },
  smallLogo: {
    width: 100,
    height: 95,
  },

  mobileLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    color: "white",
  },

  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    cursor: "pointer",
    color: "white",
  },
});
