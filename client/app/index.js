
import { useSelector } from "react-redux";

import { Platform } from "react-native";

import ProfileContainer from "../components/user/ProfileContainer";

import ProfileContainerMobile from "../components/user/ProfileContainerMobile";

import { Stack as Header } from "expo-router";

import { theme } from "../theme";

import { ScrollView, Box } from "native-base";

import { StyleSheet } from "react-native";

import LandingPage from "../components/landing_page";

import Dashboard from "../components/dashboard";

export default function Index() {

  const user = useSelector((state) => state.auth.user);
  const reduxState = useSelector((state) => state);

  console.log("reduxState", reduxState)
  return (
    <ScrollView>
      {Platform.OS === "web" ? (
        <Header.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: "Home",
          }}
        />
      ) : null}
      <Box style={styles.mutualStyles}>
        { !user ?
          <LandingPage />
          :
          <Dashboard />
        }
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mutualStyles: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});



