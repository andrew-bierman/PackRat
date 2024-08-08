import { extendTheme } from 'native-base';
import { DefaultTheme } from 'react-native-paper';

export const lightTheme = {
  colors: {
    primary: '#4A90E2',
    background: '#F5F5F5',
    secondary: '#7B8794',
    accent: '#2A9D8F',
    card: '#FFFFFF',
    text: '#333333',
    textColor: '#666666',
    border: '#E0E0E0',
    notification: '#4A90E2',
    error: '#E74C3C',
    textPrimary: '#0C66A1',
    textSecondary: '#B0B0B0',
    textDarkGrey: '#555555',
    cardIconColor: '#2A9D8F',
    iconColor: '#666666',
    weatherIcon: '#4A90E2',
    drawerIconColor: '#555555',
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

export const theme = lightTheme;

export const blueTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#0284c7',
    secondaryBlue: '#0C66A1',
    accentPurple: '#6C63FF',
    card: '#fafafa',
    text: '#FFFFFF',
    textColor: '#000',
    border: '#fafafa',
    notification: '#0A84FF',
    error: '#FF453A',
    textPrimary: '#22c55e',
    textSecondary: '#EBEBF599',
    textDarkGrey: '#3B3B3B',
    cardIconColor: '#22c55e',
    iconColor: '#FFFFFF',
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
    accentPurple: '#6C63FF',
    card: '#2D2D2D',
    text: '#C5C6C7',
    textColor: '#C5C6C7',
    border: '#4E4E50',
    notification: '#0A84FF',
    error: '#FF453A',
    textPrimary: '#22c55e',
    textSecondary: '#C5C6C799',
    textDarkGrey: '#3B3B3B',
    cardIconColor: '#22c55e',
    iconColor: '#C5C6C7',
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
      500: lightTheme.colors.primary,
    },
    amber: {
      100: lightTheme.colors.text,
    },
  },
});
export const nativeBaseDarkTheme = extendTheme({
  colors: {
    primary: {
      500: darkTheme.colors.primary,
    },
    amber: {
      100: darkTheme.colors.text,
    },
  },
});

export const lightThemePaper = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightTheme.colors.primary,
    onSurface: lightTheme.colors.text,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: lightTheme.colors.background,
    },
  },
};

export const darkPaperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: darkTheme.colors.primary,
    onSurface: darkTheme.colors.text,
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: darkTheme.colors.background,
    },
  },
};
