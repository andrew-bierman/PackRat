import { useCallback, useEffect, useReducer } from 'react';
import { Storage, storageEvents } from 'app/utils/storage';

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

const useAsyncState = <T>(
  initialValue: T | null,
): [[boolean, T | null], (value?: T | null) => void] => {
  return useReducer(
    (state: [boolean, T | null], action: T | null): [boolean, T | null] => {
      return [false, action];
    },
    [true, initialValue],
  );
};

export function useStorage<T>(key: string, initialValue?: T): UseStateHook<T> {
  const [state, setState] = useAsyncState(initialValue || '');

  useEffect(() => {
    (async () => {
      try {
        const value = await Storage.getItem(key);
        setState(value);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    })();

    const handleChange = (evt: { key: string; value: string | null }) => {
      if (evt.key !== key) return;
      setState(evt.value);
    };

    const handleRemove = (evt: { key: string }) => {
      if (evt.key !== key) return;
      setState(null);
    };

    storageEvents.once('change', handleChange);
    storageEvents.once('remove', handleRemove);

    return () => {
      storageEvents.removeListener('change', handleChange);
      storageEvents.removeListener('remove', handleRemove);
    };
  }, [key]);

  // Set value in storage
  const setValue = useCallback(
    (value: string | null) => {
      Storage.setItem(key, value);
    },
    [key],
  );

  return [state, setValue];
}
