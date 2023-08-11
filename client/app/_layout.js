import { Slot } from "expo-router";

import { Platform, View } from "react-native";

import Navigation from "../screens/Navigation";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../store/store";

import { AuthProvider } from "../context/auth";
import { ThemeProvider } from "../context/theme";
import Footer from "../components/footer/Footer";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <Navigation />
            <Slot />
            {Platform.OS === "web" ? <Footer /> : null}
          </ThemeProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
