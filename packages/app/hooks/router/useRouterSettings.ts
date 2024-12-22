import useTheme from 'app/hooks/useTheme';
import { Platform } from 'react-native';

export function useRouterSettings() {
  const { currentTheme } = useTheme();

  const stackScreenOptionsHeaderSettings = {
    headerStyle: {
      // Hack to ensure the collapsed small header shows the shadow / border.
      backgroundColor: 'rgba(255,255,255,0.01)',
    },
    headerTransparent: Platform.OS === 'ios',
  };

  const layoutStackScreenOptionsHeaderSettings = {
    headerTransparent: Platform.OS === 'ios',
    headerBlurEffect: 'systemChromeMaterial',
    headerShadowVisible: true,
    headerLargeTitleShadowVisible: false,
    headerStyle: {
      // Hack to ensure the collapsed small header shows the shadow / border.
      backgroundColor: 'rgba(255,255,255,0.01)',
    },
    headerLargeTitle: true,
    title: 'Packrat',
  };

  return {
    stackScreenOptionsHeaderSettings,
    layoutStackScreenOptionsHeaderSettings,
  };
}
