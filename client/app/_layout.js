import { Slot } from "expo-router";

import { Platform } from "react-native";
import Navigation from "../screens/NavigationHeader";

import { Provider } from "react-redux";

import { NativeBaseProvider } from "native-base";
import store from "../store/store";
import NavigationMobile from "../screens/NavigationMobile";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
          {Platform.OS === "web" ? <Navigation /> : <NavigationMobile />}
          <Slot />
      </NativeBaseProvider>
    </Provider>
  );
}
