import { useCallback, useEffect, useReducer } from 'react';
import { Storage, storageEvents } from 'app/utils/storage';

storageEvents.setMaxListeners(20);

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

function useAsyncState<T>(initialValue: T) {
  return useReducer<React.Reducer<[boolean, T], T>>(
    (state, action) => [false, action],
    [true, initialValue],
  );
}

export function useStorage<T>(key: string, initialValue?: T): UseStateHook<T> {
  const [[_, storedValue], setStoredValue] = useAsyncState<T | null>(
    initialValue ?? null,
  );

  useEffect(() => {
    (async () => {
      try {
        const value = await Storage.getItem(key);
        setStoredValue(value as T);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    })();

    const handleChange = (evt) => {
      if (evt.key !== key) return;
      setStoredValue(evt.value as T);
    };

    const handleRemove = (evt) => {
      if (evt.key !== key) return;
      setStoredValue(null);
    };

    storageEvents.on('change', handleChange);
    storageEvents.on('remove', handleRemove);

    return () => {
      storageEvents.off('change', handleChange);
      storageEvents.off('remove', handleRemove);
    };
  }, [key]);

  // Set
  const setValue = useCallback(
    (value?: T | null) => {
      Storage.setItem(key, value as unknown as string);
    },
    [key],
  );

  return [[false, storedValue], setValue];
}
