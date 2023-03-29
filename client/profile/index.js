import ProfileContainer from "../../components/user/ProfileContainer";
import { Platform } from "react-native";
import ProfileContainerMobile from "../../components/user/ProfileContainerMobile";
import { Stack as Header } from "expo-router";

export default function Profile() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Profile",
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
