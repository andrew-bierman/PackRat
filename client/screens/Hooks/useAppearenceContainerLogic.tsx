import { useEffect, useState } from 'react';
import useTheme from '../../hooks/useTheme';

export const useAppearenceContainerLogic = () => {
  const { enableDarkMode, enableLightMode, currentTheme, isDark } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((prevIsEnabled) => {
      const newState = !prevIsEnabled;
      newState ? enableDarkMode() : enableLightMode();
      return newState;
    });
  };

  useEffect(() => {
    setIsEnabled(isDark); // synchronize isEnabled with isDark whenever isDark changes
  }, [isDark]);

  return { currentTheme, toggleSwitch, isEnabled, isDark };
};
