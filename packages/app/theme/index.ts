import { extendTheme } from 'native-base';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  colors: {
    primary: '#0A84FF',
    background: 'hsla(0, 0%, 96%, 1)',
    secondaryBlue: '#0C66A1',
    accentPurple: '#6C63FF',
    card: '#f8f8f8',
    text: '#333333',
    border: '#f3f3f3',
    notification: '#0A84FF',
    error: '#FF453A',
    textPrimary: 'black',
    textSecondary: '#EBEBF599',
    textDarkGrey: '#3B3B3B',
    cardIconColor: '#22c55e',
    iconColor: '#FFFFFF',
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
    floatingBg: '#1C1C1E',
    navbarBoxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.29)',
    navbarPrimaryBackground: 'black',
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
