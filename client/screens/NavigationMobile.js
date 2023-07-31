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

const MobileDropdown = ({ setIsMenuOpen }) => {
  const { signOut } = useAuth();
  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        top: 28,
        backgroundColor: theme.colors.background,
        cursor: "pointer",
      }}
    >
      <View style={styles.link}>
        <AntDesign
          name="close"
          size={28}
          color={theme.colors.iconColor}
          onPress={() => setIsMenuOpen(false)}
        />
      </View>
      <Link href="/">
        <View style={styles.link}>
          <Entypo name="home" size={24} color={theme.colors.iconColor} />

          <Text style={{ color: "white" }}>Home</Text>
        </View>
      </Link>
      <Link href="profile">
        <View style={styles.link}>
          <FontAwesome name="book" size={24} color={theme.colors.iconColor} />
          <Text style={{ color: "white" }}>Profile</Text>
        </View>
      </Link>
      <Link href="/packs">
        <View style={styles.link}>
          <MaterialIcons
            name="backpack"
            size={24}
            color={theme.colors.iconColor}
          />

          <Text style={{ color: "white" }}>Packs</Text>
        </View>
      </Link>
      <View style={styles.link}>
        <MaterialIcons name="logout" size={24} color={theme.colors.iconColor} />
        <Text style={{ color: "white" }} onPress={() => signOut()}>
          Logout
        </Text>
      </View>
    </View>
  );
};

export default function NavigationMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

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

      <EvilIcons
        name="navicon"
        size={48}
        color={theme.colors.iconColor}
        onPress={() => setIsMenuOpen(!isMenuOpen)}
      />

      {isMenuOpen ? <MobileDropdown setIsMenuOpen={setIsMenuOpen} /> : null}
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
    padding: 25,
    position: "relative",
    paddingVertical: 120,
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
