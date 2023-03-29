import Register from "../../screens/RegisterScreen";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";

export default function RegisterContainer() {
  return Platform.OS === "web" ? (
    <>
      <Header.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Register",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles

          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Register />
    </>
  ) : (
    <Register />
  );
}
