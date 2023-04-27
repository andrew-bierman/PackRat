
import { useSelector } from "react-redux";

import { Platform } from "react-native";

import ProfileContainer from "../components/user/ProfileContainer";

import ProfileContainerMobile from "../components/user/ProfileContainerMobile";

import { Stack as Header } from "expo-router";

export default function Index() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <ProfileContainer />
    </>
  ) : (
    <ProfileContainerMobile />
  );
}


