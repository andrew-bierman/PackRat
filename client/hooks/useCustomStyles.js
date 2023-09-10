// hooks/useCustomStyles.js
import { StyleSheet } from 'react-native';
import useTheme from './useTheme';
import { theme as appTheme } from '../theme';

const useCustomStyles = (stylesOrFunctionOrStylesheet) => {
  const currentTheme = useTheme();

  if (typeof stylesOrFunctionOrStylesheet === 'function') {
    return StyleSheet.create(
      stylesOrFunctionOrStylesheet(currentTheme, appTheme),
    );
  } else if (StyleSheet.flatten(stylesOrFunctionOrStylesheet)) {
    // If it's already a StyleSheet
    return stylesOrFunctionOrStylesheet;
  } else {
    // If it's a raw styles object
    return StyleSheet.create(stylesOrFunctionOrStylesheet);
  }
};

export default useCustomStyles;
