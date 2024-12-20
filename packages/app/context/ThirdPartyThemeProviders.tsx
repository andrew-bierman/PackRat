import React from 'react';
import { TamaguiProvider, Theme as TamaguiTheme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';
import config from '../theme/tamagui.config';
import { ThemeProvider as RNPaperThemeProvider } from 'react-native-paper';
import {
  darkPaperTheme,
  lightThemePaper,
  nativeBaseDarkTheme,
  nativeBaseLightTheme,
} from '../theme';
import FontLoader from './FontLoader';
import { setupDev } from 'tamagui';
import { Toaster } from 'burnt/web';
import {
  ThemeProvider as NavigationThemeProvider,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme as useNavigationTheme,
} from '@react-navigation/native';

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
      <NavigationThemeProvider
        value={isDark ? NavigationDarkTheme : NavigationDefaultTheme}
      >
        <TamaguiProvider config={config} disableRootThemeClass={false}>
          <TamaguiTheme name={isDark ? 'dark' : 'light'}>
            <ToastProvider>
              <RNPaperThemeProvider theme={darkPaperTheme}>
                {children}
                <Toaster richColors />
              </RNPaperThemeProvider>
            </ToastProvider>
          </TamaguiTheme>
        </TamaguiProvider>
      </NavigationThemeProvider>
    </FontLoader>
  );
};

export default ThirdPartyProviders;
