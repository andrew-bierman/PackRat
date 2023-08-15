import React from "react";
import { TamaguiProvider, Theme as TamaguiTheme } from "tamagui";
import config from "../theme/tamagui.config";
import { ThemeProvider as RNPaperThemeProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";

const ThirdPartyProviders = ({ children, isDark = false }) => {
  return (
    <TamaguiProvider config={config}>
      <TamaguiTheme name={isDark ? "dark" : "light"}>
        <RNPaperThemeProvider>
            <NativeBaseProvider>
                {children}
            </NativeBaseProvider>
        </RNPaperThemeProvider>
      </TamaguiTheme>
    </TamaguiProvider>
  );
};

export default ThirdPartyProviders;
