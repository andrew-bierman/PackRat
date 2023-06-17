import React from "react";
import { Platform } from "react-native";
import { Stack as Header } from "expo-router";
import NotFoundPage from "../screens/NotFound";

export default function Unmatched() {
    return Platform.OS === "web" ? (
      <>
        <Header.Screen
          options={{
            // https://reactnavigation.org/docs/headers#setting-the-header-title
            title: "Not Found",
            // https://reactnavigation.org/docs/headers#adjusting-header-styles
  
            // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          }}
        />
        <NotFoundPage />
      </>
    ) : (
        <NotFoundPage />
    );
  }
  


