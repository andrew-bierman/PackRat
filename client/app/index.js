
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

  if (Platform.OS === "web") {
    // On android and iOS, trying this block of code will fail and go to the catch block.
    try {
      // Select the <head> tag under <body>
      const headTag = document.querySelector("head");
      // Create the <link/> tag.
      const icon = document.createElement("link");
      // Create the rel="" attribute
      const attributeRel = document.createAttribute("rel");
      // Assign the value "icon" to the rel attribute so that attributeRel becomes rel="icon"
      attributeRel.value = "icon";
      // Create the href="" attribute
      const attributeHref = document.createAttribute("href");
      // Assign your application icon path to the href attribute so that attributeHref becomes href="path/to/my/icon"
      attributeHref.value =
        "/assets/packrat-app-icon.png";
      // Set the rel attibute to <link> so that the icon JS object becomes <link rel="icon"/>
      icon.setAttributeNode(attributeRel);
      // Set the href attibute to <link> so that the icon JS object becomes <link rel="icon" href="path/to/my/icon"/>
      icon.setAttributeNode(attributeHref);
      // Insert the <link [...] /> tag into the <head>
      headTag.appendChild(icon);
    } catch (e) {
      //Browser tabs do not exist on android and iOS, so let's just do nothing here.
    }
  }

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



