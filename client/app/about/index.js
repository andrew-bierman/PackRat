import About from "../../components/about";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";

export default function AboutRoute() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "About",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <About />
    </>
  ) : (
    <About />
  );
}
