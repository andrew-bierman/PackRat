import React from 'react';
import { styled, Button, ButtonProps } from 'tamagui';

interface RPrimaryButtonProps extends ButtonProps {
  label: string;
}

const StyledRPrimaryButton = styled(Button, {
  name: 'RPrimaryButton',
  backgroundColor: '#232323',
  color: 'white',
  fontWeight: 'bold',
  borderWidth: 0,
  fontSize: 16,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  cursor: 'pointer',
  hoverStyle: {
    opacity: 0.8,
    backgroundColor: '#232323',
  },

  variants: {
    disabled: {
      true: {
        backgroundColor: '#5C788A',
        cursor: 'not-allowed',
      },
    },
    size: {
      sm: {
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      lg: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

const RPrimaryButton: React.FC<RPrimaryButtonProps> = ({
  label,
  disabled,
  size,
  ...props
}) => (
  <StyledRPrimaryButton disabled={disabled} size={size} {...props}>
    {label}
  </StyledRPrimaryButton>
);

export default RPrimaryButton;
