import { extendTheme } from 'native-base';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  colors: {
    primary: '#0A84FF',
    background: '#fdfbff',
    secondaryBlue: '#cce5ff',
    tertiaryBlue: '#0C66A1',
    accentPurple: '#6C63FF',
    card: '#fafafa',
    text: '#526070',
    border: '#e0e2ec',
    notification: '#0A84FF',
    error: '#FF453A',
    textGreen: '#22c55e',
    tertiaryBlueGrey: '#3B3B3B',
    cardIconColor: '#22c55e',
    iconColor: '#003064',
    weatherIcon: '#0284c7',
    drawerIconColor: '#3B3B3B',
    white: '#FFFFFF',
    black: '#000000',
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
    background: '#1A1A1D',
    secondaryBlue: '#0C66A1',
    tertiaryBlue: '#96c7f2',
    accentPurple: '#6C63FF',
    card: '#2D2D2D',
    text: '#8e9099',
    border: '#44474e',
    notification: '#0A84FF',
    error: '#FF453A',
    textGreen: '#22c55e',
    tertiaryBlueGrey: '#3B3B3B',
    cardIconColor: '#d6e3ff',
    iconColor: '#cfe5ff',
    weatherIcon: '#0A84FF',
    drawerIconColor: '#3B3B3B',
    white: '#FFFFFF',
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
