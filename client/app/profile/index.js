import ProfileContainer from "../../components/user/ProfileContainer";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";
import { ScrollView } from "react-native";

export default function Profile() {
  return (
    <ScrollView>
      {
        Platform.OS === "web" ? (
          <>
            <Header.Screen
              options={{
                // https://reactnavigation.org/docs/headers#setting-the-header-title
                title: "Profile",
                // http://reactnavigation.org/docs/headers#adjusting-header-styles

                // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
              }}
            />
            <ProfileContainer />
          </>
        ) : (
          <ProfileContainer />
        )
        // <ProfileContainerMobile />
      }
    </ScrollView>
  );
}
