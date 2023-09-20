import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, undefined],
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null) => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  try {
    if (value == null) {
      await AsyncStorage.removeItem(key);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.error('Local storage is unavailable:', e);
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  React.useEffect(() => {

    const getUser = async () => {
      const user = await AsyncStorage.getItem(key)
      if (!user) return
      setState(JSON.parse(user));
    }

    try {
      getUser()
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  }, [key]);

  // Set
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
