import { Slot } from "expo-router";

import { Platform } from "react-native";
import Navigation from "../screens/NavigationHeader";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { NativeBaseProvider } from "native-base";

import { store, persistor } from "../store/store";

import { AuthProvider } from "../context/auth";
import NavigationMobile from "../screens/NavigationMobile";
import Footer from "../components/footer/Footer";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NativeBaseProvider>
            {Platform.OS === "web" ? <Navigation /> : <NavigationMobile />}
            <Slot />
            {Platform.OS === "web" ? <Footer /> : null}
          </NativeBaseProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
