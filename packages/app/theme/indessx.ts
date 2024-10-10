import { extendTheme } from 'native-base';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  colors: {
    background: Platform.OS === 'web' ? 'hsla(0, 0%, 96%, 1)' : '#fcfcfc',
    secondaryBlue: Platform.OS === 'web' ?'#0C66A1' : '#cce5ff',
    tertiaryBlue:  Platform.OS === 'web' ? '#0C66A1' : '#0C66A1',
    accentPurple: Platform.OS === 'web' ? '#6C63FF' : '#6C63FF',
    card: Platform.OS === 'web' ? '#f8f8f8' : '#f8f8f8',
    text: Platform.OS === 'web' ? '#333333' : '#333333',
    border: Platform.OS === 'web' ? '#f3f3f3' : '#f3f3f3',  
    notification: Platform.OS === 'web' ? '#0A84FF' : '#0A84FF',
    error: '#FF453A',
    textGreen: Platform.OS === 'web' ? undefined : '#22c55e',
    tertiaryBlueGrey: Platform.OS === 'web' ? undefined : '#3B3B3B',
    cardIconColor: Platform.OS === 'web' ? '#22c55e' : '#22c55e',
    iconColor: Platform.OS === 'web' ? '#FFFFFF' : '#003064',
    weatherIcon: Platform.OS === 'web' ? '#0284c7' : '#0284c7',
    drawerIconColor: Platform.OS === 'web' ? '#3B3B3B' : '#3B3B3B',
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
    background: '#050505',
    secondaryBlue: '#0C66A1',
    tertiaryBlue: '#96c7f2',
    accentPurple: '#6C63FF',
    card: '#1c1a17',
    text: '#eaf6ff',
    border: '#221f1c',
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
