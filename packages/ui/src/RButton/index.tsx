import { Button, ButtonProps, styled } from 'tamagui';
import { useHaptic } from 'app/hooks/common';
import { useCallback } from 'react';

interface HapticRButtonProps extends ButtonProps {
  hapticStrength?: 'light' | 'medium' | 'heavy';
}

const StyledButton = styled(Button, {
  backgroundColor: '#0C66A1', // temp fix, we need to set up proper tamagui theme
  color: 'white',
} as any);

const RButton: React.FC<HapticRButtonProps> = ({
  hapticStrength,
  onPress,
  ...props
}) => {
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

  const handlePress = (e) => {
    onPress?.(e);
    triggerHapticFeedback();
  };

  return <StyledButton {...props} onPress={handlePress} />;
};

export default RButton;
