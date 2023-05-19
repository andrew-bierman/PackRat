import Feed from "../../components/feed/Feed";
import FeedMobile from "../../components/feed/FeedMobile";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";

export default function Packs() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Packs",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Feed feedType="userPacks" />
    </>
  ) : (
    <FeedMobile />
  );
}
