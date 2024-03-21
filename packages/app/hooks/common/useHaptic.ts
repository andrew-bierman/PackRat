import * as Haptics from 'expo-haptics';
import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

export const useHaptic = () => {
  const createFeedbackHandler = useCallback((action: any, type: string) => {
    if (Platform.OS === 'web') {
      return () => {};
    }
    return () => action(Haptics.ImpactFeedbackStyle[type]);
  }, []);

  return useMemo(
    () => ({
      selection: Platform.OS === 'web' ? undefined : Haptics.selectionAsync,
      success: createFeedbackHandler(
        Haptics.notificationAsync,
        Haptics.NotificationFeedbackType.Success,
      ),
      error: createFeedbackHandler(
        Haptics.notificationAsync,
        Haptics.NotificationFeedbackType.Error,
      ),
      warning: createFeedbackHandler(
        Haptics.notificationAsync,
        Haptics.NotificationFeedbackType.Warning,
      ),
      light: createFeedbackHandler(
        Haptics.impactAsync,
        Haptics.ImpactFeedbackStyle.Light,
      ),
      medium: createFeedbackHandler(
        Haptics.impactAsync,
        Haptics.ImpactFeedbackStyle.Medium,
      ),
      heavy: createFeedbackHandler(
        Haptics.impactAsync,
        Haptics.ImpactFeedbackStyle.Heavy,
      ),
    }),
    [],
  );
};
