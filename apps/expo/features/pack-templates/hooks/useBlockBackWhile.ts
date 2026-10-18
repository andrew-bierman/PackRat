import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/** Swallows the Android back button while `blocked` is true. */
export function useBlockBackWhile(blocked: boolean) {
  useEffect(() => {
    if (!blocked) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [blocked]);
}
