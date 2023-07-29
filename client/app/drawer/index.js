import { View, StyleSheet, Text, Image } from "react-native";
import { Link } from "expo-router";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { theme } from "../../theme";
// import { useAuth } from "../../auth/provider";
import { signOut } from "../../store/authStore";

import { useDispatch, useSelector } from "react-redux";

export default function Drawer() {
  // const { signOut } = useAuth();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View style={styles.closeIcon}>
          <Link href="/">
            <AntDesign
              name="close"
              size={35}
              color={theme.colors.drawerIconColor}
            />
          </Link>
        </View>
        {user ? (
          <>
            <Link href="/">
              <View style={styles.link}>
                <Entypo
                  name="home"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />

                <Text style={{ color: "#3B3B3B" }}>Home</Text>
              </View>
            </Link>
            <Link href="/trips">
              <View style={styles.link}>
                <MaterialCommunityIcons
                  name="weather-pouring"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />

                <Text style={{ color: "#3B3B3B" }}>Trips</Text>
              </View>
            </Link>
            <Link href="profile">
              <View style={styles.link}>
                <FontAwesome
                  name="book"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />
                <Text style={{ color: "#3B3B3B" }}>Profile</Text>
              </View>
            </Link>
            <Link href="/packs">
              <View style={styles.link}>
                <MaterialIcons
                  name="backpack"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />

                <Text style={{ color: "#3B3B3B" }}>Packs</Text>
              </View>
            </Link>
            <Link href="/about">
              <View style={styles.link}>
                <MaterialIcons
                  name="info"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />

                <Text style={{ color: "#3B3B3B" }}>About</Text>
              </View>
            </Link>
            <View style={styles.link}>
              <MaterialIcons
                name="logout"
                size={24}
                color={theme.colors.drawerIconColor}
              />
              <Text
                style={{ color: "#3B3B3B" }}
                onPress={() => handleSignOut()}
              >
                Logout
              </Text>
            </View>
          </>
        ) : (
          <View>
            <Link href="/sign-in">
              <View style={styles.link}>
                <MaterialIcons
                  name="login"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />
                <Text style={{ color: "#3B3B3B" }}>Login</Text>
              </View>
            </Link>
            <Link href="/register">
              <View style={styles.link}>
                <MaterialIcons
                  name="person-add"
                  size={24}
                  color={theme.colors.drawerIconColor}
                />
                <Text style={{ color: "#3B3B3B" }}>Sign Up</Text>
              </View>
            </Link>
          </View>
        )}
      </View>
    </>
  );
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
    gap: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "100%",
    color: "black",
  },
  closeIcon: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: "100%",
    color: "black",
  },
});
