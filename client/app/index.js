import { useSelector } from "react-redux";

import { Platform } from "react-native";

import { Stack as Header } from "expo-router";

import { darkTheme, theme } from "../theme";

import { Box } from "native-base";

import { StyleSheet } from "react-native";

import LandingPage from "../components/landing_page";

import Dashboard from "../screens/dashboard";
import useTheme from "../hooks/useTheme";
import { current } from "@reduxjs/toolkit";

export default function Index() {
  const {
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
    currentTheme = theme,
  } = useTheme();

  const user = useSelector((state) => state.auth.user);

  const mutualStyles = {
    backgroundColor: currentTheme.colors.background,
    flex: 1,
  };

  return (
    <>
      {Platform.OS === "web" ? (
        <Header.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: "Home",
          }}
        />
      ) : null}
      <Box style={mutualStyles}>{!user ? <LandingPage /> : <Dashboard />}</Box>
    </>
  );
}
