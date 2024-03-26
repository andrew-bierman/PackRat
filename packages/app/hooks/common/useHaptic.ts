import {
  selectionAsync,
  notificationAsync,
  NotificationFeedbackType,
  impactAsync,
  ImpactFeedbackStyle,
} from 'expo-haptics';
import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';

export const useHaptic = () => {
  const createFeedbackHandler = useCallback((action: any, type: string) => {
    if (Platform.OS === 'web') {
      return () => {};
    }
    return () => action(type);
  }, []);

  return useMemo(
    () => ({
      selection: Platform.OS === 'web' ? undefined : selectionAsync,
      success: createFeedbackHandler(
        notificationAsync,
        NotificationFeedbackType.Success,
      ),
      error: createFeedbackHandler(
        notificationAsync,
        NotificationFeedbackType.Error,
      ),
      warning: createFeedbackHandler(
        notificationAsync,
        NotificationFeedbackType.Warning,
      ),
      light: createFeedbackHandler(impactAsync, ImpactFeedbackStyle.Light),
      medium: createFeedbackHandler(impactAsync, ImpactFeedbackStyle.Medium),
      heavy: createFeedbackHandler(impactAsync, ImpactFeedbackStyle.Heavy),
    }),
    [],
  );
};
