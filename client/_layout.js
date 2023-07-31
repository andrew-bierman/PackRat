import { Slot } from "expo-router";

import { Platform } from "react-native";
import Navigation from "../screens/NavigationHeader";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";
import { NativeBaseProvider } from "native-base";
import store from "../store/store";
import NavigationMobile from "../screens/NavigationMobile";

import { ProviderAuth } from "../auth/provider";

export default function HomeLayout() {
  return (
    <ProviderAuth>
      <NativeBaseProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            {Platform.OS === "web" ? <Navigation /> : <NavigationMobile />}
            <Slot />
          </QueryClientProvider>
        </Provider>
      </NativeBaseProvider>
    </ProviderAuth>
  );
}
