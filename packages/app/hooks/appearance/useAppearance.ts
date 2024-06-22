import useTheme from '../useTheme';
import { useStorageState } from 'app/hooks/storage/useStorageState';

const useAppearance = () => {
  const { enableDarkMode, enableLightMode, isDark, currentTheme } = useTheme();
  const [[, isEnabledString], setIsEnabled] = useStorageState('isEnabled');

  // Convert string to boolean
  const isEnabled = JSON.parse(isEnabledString);

  const toggleSwitch = async () => {
    const newIsEnabledValue = !isEnabled ? 'true' : 'false';
    setIsEnabled(newIsEnabledValue);
    // Apply theme change directly here to avoid dependency on isEnabled state update
    if (!isEnabled) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  };

  return {
    isEnabled,
    toggleSwitch,
    currentTheme,
  };
};

export default useAppearance;
