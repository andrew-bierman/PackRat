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
import FontLoader from './FontLoader';

const ThirdPartyProviders = ({ children, isDark = false }) => {
  // const { isDark } = useTheme()
  return (
    <FontLoader>
      <NativeBaseProvider
        theme={isDark ? nativeBaseDarkTheme : nativeBaseLightTheme}
      >
        <TamaguiProvider config={config}>
          <TamaguiTheme name={isDark ? 'dark' : 'light'}>
            <RNPaperThemeProvider theme={darkPaperTheme}>
              {children}
            </RNPaperThemeProvider>
          </TamaguiTheme>
        </TamaguiProvider>
      </NativeBaseProvider>
    </FontLoader>
  );
};

export default ThirdPartyProviders;
