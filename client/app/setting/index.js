import { Platform } from "react-native";
import { Stack as Header } from "expo-router";
import UserSetting from "../../components/user/usersetting/UserSetting";
import UserSettingMobile from "../../components/user/usersetting/UserSettingMobile";

export default function Profile() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Setting",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <UserSetting />
    </>
  ) : (
    <UserSettingMobile />
  );
}
