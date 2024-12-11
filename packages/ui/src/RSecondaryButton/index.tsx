import React from 'react';
import { styled, Button, ButtonProps } from 'tamagui';

interface RSecondaryButtonProps extends ButtonProps {
  label: string;
}

const StyledSecondaryButton = styled(Button, {
  name: 'RSecondaryButton',
  backgroundColor: 'transparent',
  color: '#7e7f80',
  borderWidth: 0,
  fontWeight: 'bold',
  fontSize: 16,
  padding: 10,
  borderRadius: 8,
  cursor: 'pointer',
  hoverStyle: {
    backgroundColor: 'transparent',
  },

  variants: {
    disabled: {
      true: {
        borderColor: '#5C788A',
        color: '#5C788A',
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

const RSecondaryButton: React.FC<RSecondaryButtonProps> = ({
  label,
  disabled,
  size,
  ...props
}) => (
  <StyledSecondaryButton disabled={disabled} size={size} {...props}>
    {label}
  </StyledSecondaryButton>
);

export default RSecondaryButton;
