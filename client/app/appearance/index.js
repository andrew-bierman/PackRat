import ProfileContainer from "../../components/user/ProfileContainer";
import { Platform } from "react-native";
import ProfileContainerMobile from "../../components/user/ProfileContainerMobile";
import { Stack as Header } from "expo-router";
import AppearanceContainer from "../../components/appearance/AppearanceContainer";

export default function Appearance() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Appearance",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />

      <AppearanceContainer />
    </>
  ) : (
    <AppearanceContainer />

    // <ProfileContainerMobile />
  );
}
