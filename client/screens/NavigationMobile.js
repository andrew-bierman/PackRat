import { View, StyleSheet, Text, Image } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "../auth/provider";

import { theme } from "../theme";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import packratlogo from "../assets/packrat.png";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function NavigationMobile() {

  // const { user } = useAuth();
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <View style={styles.mobileContainer}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Image src={String(packratlogo)} alt="logo" />
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          PackRat
        </Text>
      </View>
      <Link href="/drawer">
        <EvilIcons
          name="navicon"
          size={48}
          color={theme.colors.iconColor}
        // onPress={() => setIsMenuOpen(!isMenuOpen)}
        />
      </Link>

    </View>
  ) : null;
}

const styles = StyleSheet.create({
  mobileContainer: {
    backgroundColor: theme.colors.background,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    position: "relative",
  },

  logo: {
    width: 60,
    height: 50,
  },
  smallLogo: {
    width: 100,
    height: 95,
  },

  link: {
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
});
