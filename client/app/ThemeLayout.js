import { Slot } from "expo-router";

import { Platform, View } from "react-native";
import Navigation from "../screens/Navigation";
import { TamaguiProvider, Theme } from 'tamagui'

import config from "../theme/tamagui.config";
import { ThemeProvider as RNPaperThemeProvider } from 'react-native-paper'
import { NativeBaseProvider } from "native-base";
import Footer from "../components/footer/Footer";
import UseTheme from "../hooks/useTheme";
export const ThemeLayout = () => {
    const { isDark}  = UseTheme()
    console.log(isDark, 'is dark or not')
    return (
        
        <TamaguiProvider config={config}>
            <Theme  name={isDark ? 'dark' : 'light'}>
          <NativeBaseProvider>
            <RNPaperThemeProvider >
            <Navigation />
            <Slot />
            {Platform.OS === "web" ? <Footer /> : null}
            </RNPaperThemeProvider>
          </NativeBaseProvider>
            </Theme>
        </TamaguiProvider>
    )
}