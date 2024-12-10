import { extendTheme } from 'native-base';
import { Platform } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  colors: {
    primary: '#0A84FF',
    background: Platform.OS === 'web' ? 'hsla(0, 0%, 96%, 1)' : '#fcfcfc',
    secondaryBlue: Platform.OS === 'web' ? '#0C66A1' : '#cce5ff',
    accentPurple: Platform.OS === 'web' ? '#6C63FF' : '#6C63FF',
    card: Platform.OS === 'web' ? '#f8f8f8' : '#f8f8f8',
    text: Platform.OS === 'web' ? '#333333' : '#333333',
    border: Platform.OS === 'web' ? '#f3f3f3' : '#f3f3f3',
    notification: '#0A84FF',
    textGreen: Platform.OS === 'web' ? undefined : '#22c55e',
    tertiaryBlueGrey: Platform.OS === 'web' ? undefined : '#3B3B3B',
    error: '#FF453A',
    textPrimary: 'black',
    textSecondary: '#48484a',
    tertiaryBlue: Platform.OS === 'web' ? '#0C66A1' : '#0C66A1',
    textDarkGrey: '#3B3B3B',
    cardIconColor: '#22c55e',
    iconColor: Platform.OS === 'web' ? '#FFFFFF' : '#003064',
    icon: 'black',
    weatherIcon: '#0284c7',
    drawerIconColor: '#3B3B3B',
    white: '#FFFFFF',
    black: '#000000',
    cardBorderPrimary: 'rgba(0, 0, 0, 0.2)',
    buttonBackgroundPrimary: '#404040',
    floatingBg: '#f0f2f5',
    navbarBoxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.29)',
    navbarPrimaryBackground: '#f6f6f6',
    logo: 'rgb(12, 102, 161)',
  },
  font: {
    headerFont: 56,
    size: 18,
    desktop: 36,
  },
  padding: {
    paddingDesktop: 24,
    paddingInside: 105,
    paddingTablet: 80,
  },
  size: {
    cardPadding: 45,
    mobilePadding: 30,
  },
  width: {
    widthDesktop: '85%',
  },
};

export const darkTheme = {
  colors: {
    primary: '#0A84FF',
    background: 'black',
    secondaryBlue: '#0C66A1',
    tertiaryBlue: '#96c7f2',
    accentPurple: '#6C63FF',
    card: '#1c1a17',
    text: '#eaf6ff',
    border: '#221f1c',
    notification: '#0A84FF',
    error: '#FF453A',
    textPrimary: 'white',
    textSecondary: '#C5C6C799',
    textDarkGrey: '#B0B0B0',
    cardIconColor: '#22c55e',
    iconColor: '#C5C6C7',
    icon: 'white',
    weatherIcon: '#0A84FF',
    drawerIconColor: '#3B3B3B',
    white: '#FFFFFF',
    cardBorderPrimary: 'rgba(255, 255, 255, 0.3)',
    buttonBackgroundPrimary: '#B0B0B0',
    floatingBg: '#232323',
    navbarBoxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.29)',
    navbarPrimaryBackground: 'black',
    logo: 'rgb(150, 199, 242)',
  },
  font: {
    headerFont: 56,
    size: 18,
    desktop: 36,
  },
  padding: {
    paddingDesktop: 24,
    paddingInside: 105,
    paddingTablet: 80,
  },
  size: {
    cardPadding: 45,
    mobilePadding: 30,
  },
  width: {
    widthDesktop: '85%',
  },
};

export const nativeBaseLightTheme = extendTheme({
  colors: {
    primary: {
      500: theme.colors.background,
    },
    amber: {
      100: theme.colors.white,
    },
  },
});
export const nativeBaseDarkTheme = extendTheme({
  colors: {
    primary: {
      500: darkTheme.colors.background,
    },
    amber: {
      100: darkTheme.colors.white,
    },
  },
});

export const lightThemePaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    onSurface: theme.colors.white,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: theme.colors.background,
    },
  },
};

export const darkPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkTheme.colors.primary,
    onSurface: darkTheme.colors.white,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: darkTheme.colors.background,
    },
  },
};
