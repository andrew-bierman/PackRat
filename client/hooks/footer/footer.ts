import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';

export const useFooter = () => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const year = new Date().getFullYear();
  return {
    year,
    currentTheme,
    enableDarkMode,
    enableLightMode,
    isDark,
    isLight,
  };
};
