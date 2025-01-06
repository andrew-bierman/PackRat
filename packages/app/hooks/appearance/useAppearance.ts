import useTheme from '../useTheme';
import { useStorageState } from 'app/hooks/storage/useStorageState';

const useAppearance = () => {
  const { enableDarkMode, enableLightMode, currentTheme } = useTheme();
  const [[, isEnabledString], setIsEnabled] = useStorageState('isEnabled');

  // Convert string to boolean
  const isEnabled = isEnabledString ? JSON.parse(isEnabledString) : false;

  const toggleSwitch = async () => {
    const newIsEnabledValue = !isEnabled ? 'true' : 'false';
    setIsEnabled(newIsEnabledValue);
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
