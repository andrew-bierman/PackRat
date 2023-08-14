import { Slot } from "expo-router";

import { Platform, View } from "react-native";

import Navigation from "../screens/Navigation";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { NativeBaseProvider } from "native-base";

import { store, persistor } from "../store/store";

import { AuthProvider } from "../context/auth";
import Footer from "../components/footer/Footer";
import { ThemeProvider } from "../context/theme";
import FlashMessage from "react-native-flash-message";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <NativeBaseProvider>
              <Navigation />
              <Slot />
              {Platform.OS === "web" ? <Footer /> : null}
            </NativeBaseProvider>
          </ThemeProvider>
          <FlashMessage position="top" />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
