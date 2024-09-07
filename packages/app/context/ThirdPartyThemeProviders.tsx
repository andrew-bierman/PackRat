import React from 'react';
import { TamaguiProvider, Theme as TamaguiTheme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';
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
import { setupDev } from 'tamagui';
import { Toaster } from 'burnt/web';

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
        <TamaguiProvider config={config} disableRootThemeClass={false}>
          <TamaguiTheme name={isDark ? 'dark' : 'light'}>
            <ToastProvider>
              <RNPaperThemeProvider theme={darkPaperTheme}>
                {children}
                <Toaster />
              </RNPaperThemeProvider>
            </ToastProvider>
          </TamaguiTheme>
        </TamaguiProvider>
      </NativeBaseProvider>
    </FontLoader>
  );
};

export default ThirdPartyProviders;
