import React from 'react';
import { TamaguiProvider, Theme as TamaguiTheme } from 'tamagui';
import config from '../theme/tamagui.config';
import { ThemeProvider as RNPaperThemeProvider } from 'react-native-paper';
import { NativeBaseProvider } from 'native-base';
import {
  darkPaperTheme,
  lightThemePaper,
  nativeBaseDarkTheme,
  nativeBaseLightTheme,
} from '../theme';

const ThirdPartyProviders = ({ children, isDark = false }) => {
  // const { isDark } = useTheme()
  return (
    <TamaguiProvider config={config}>
      <TamaguiTheme name={isDark ? 'dark' : 'light'}>
        <RNPaperThemeProvider theme={isDark ? darkPaperTheme : lightThemePaper}>
          <NativeBaseProvider
            theme={isDark ? nativeBaseDarkTheme : nativeBaseLightTheme}
          >
            {children}
          </NativeBaseProvider>
        </RNPaperThemeProvider>
      </TamaguiTheme>
    </TamaguiProvider>
  );
};

export default ThirdPartyProviders;
