import { useState, useEffect } from 'react';
import useTheme from '../useTheme';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAppearance = () => {
  const { enableDarkMode, enableLightMode, isDark, currentTheme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(isDark);

  const setItem = async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  };

  const getItem = async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  };

  const toggleSwitch = async () => {
    setIsEnabled((prevIsEnabled) => {
      const newState = !prevIsEnabled;
      newState ? enableDarkMode() : enableLightMode();
      setItem('isEnabled', JSON.stringify(newState)); // store the new state
      return newState;
    });
  };

  useEffect(() => {
    const getStoredIsEnabled = async () => {
      const storedIsEnabled = await getItem('isEnabled'); // get the stored value
      if (storedIsEnabled !== null) {
        setIsEnabled(JSON.parse(storedIsEnabled)); // if it exists, use it
      }
    };
    getStoredIsEnabled();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    // This will run whenever isEnabled changes
    if (isEnabled) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }, [isEnabled]);

  return {
    isEnabled,
    toggleSwitch,
    currentTheme,
  };
};

export default useAppearance;
