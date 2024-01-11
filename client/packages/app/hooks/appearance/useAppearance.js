import { useState, useEffect } from 'react';
import useTheme from '../useTheme';

const useAppearance = () => {
  const { enableDarkMode, enableLightMode, isDark, currentTheme } = useTheme();
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

  return {
    isEnabled,
    toggleSwitch,
    currentTheme,
  };
};

export default useAppearance;
