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
import { setupDev } from '@tamagui/core';

const ThirdPartyProviders = ({ children, isDark = false }) => {
  setupDev({
    // can just be true as well for defaulting to key: Alt + delay: 800
    visualizer: {
      key: 'Alt',
      delay: 800,
    },
  });

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
