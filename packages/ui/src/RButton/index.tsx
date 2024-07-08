import React, { useCallback } from 'react';
import { Button, ButtonProps, styled } from 'tamagui';
import { useHaptic } from 'app/hooks/common';

interface HapticRButtonProps extends ButtonProps {
  hapticStrength?: 'light' | 'medium' | 'heavy';
}

const StyledButton = styled(Button, {
  backgroundColor: '#0C66A1', // temp fix, we need to set up proper tamagui theme
  color: 'white',
} as any);

const RButton = React.forwardRef<HTMLElement, HapticRButtonProps>(
  ({ hapticStrength, onPress, ...props }, ref) => {
    const haptic = useHaptic();

    const triggerHapticFeedback = useCallback(() => {
      switch (hapticStrength) {
        case 'light':
          haptic.light();
          break;
        case 'medium':
          haptic.medium();
          break;
        case 'heavy':
          haptic.heavy();
          break;
      }
    }, [hapticStrength]);

    const handlePress = (e: any) => {
      onPress?.(e);
      triggerHapticFeedback();
    };

    return <StyledButton {...props} ref={ref} onPress={handlePress} />;
  },
);

RButton.displayName = 'RButton';

export default RButton;
