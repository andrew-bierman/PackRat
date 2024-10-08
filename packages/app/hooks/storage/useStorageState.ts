import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null) => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

// Function to set storage items based on the platform
export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error('Web localStorage is unavailable:', e);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// Custom hook to manage storage state (works for both web and native platforms)
export function useStorageState(key: string): UseStateHook<string> {
  // Public state
  const [state, setState] = useAsyncState<string>();

  // Get storage value on mount
  React.useEffect(() => {
    const getToken = async () => {
      if (Platform.OS === 'web') {
        try {
          const token = localStorage.getItem(key);
          setState(token);
        } catch (e) {
          console.error('Web localStorage is unavailable:', e);
        }
      } else {
        await SecureStore.getItemAsync(key).then((value) => {
          setState(value);
        });
      }
    };

    try {
      getToken();
    } catch (e) {
      console.error('Storage retrieval error:', e);
    }
  }, [key]);

  // Set storage value
  const setValue = React.useCallback(
    (value: string | null) => {
      setStorageItemAsync(key, value).then(() => {
        setState(value);
      });
    },
    [key],
  );

  return [state, setValue];
}
