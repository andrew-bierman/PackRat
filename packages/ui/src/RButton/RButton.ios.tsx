import React from 'react';
import { ButtonProps } from 'tamagui';
import { ButtonBase } from './ButtonBase';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Define extended props interface
interface HapticRButtonProps extends ButtonProps {
  haptic?: 'light' | 'medium' | 'heavy';
}

export const RButton: React.FC<HapticRButtonProps> = ({ haptic, ...props }) => {
  const handlePress = () => {
    // Trigger haptic feedback based on the `haptic` prop
    if (Platform.OS !== 'web' && haptic) {
      triggerHapticFeedback(haptic);
    }

    // If there's an onPress prop, call it
    if (props.onPress) {
    }
  };

  return <RButton {...props} onPress={handlePress} />;
};

// Helper function to trigger haptic feedback
const triggerHapticFeedback = (
  hapticStrength: 'light' | 'medium' | 'heavy',
) => {
  switch (hapticStrength) {
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
  }
};
