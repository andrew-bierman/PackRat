import React from 'react';
import { styled, Button, ButtonProps } from 'tamagui';
import useTheme from 'app/hooks/useTheme';

interface RSecondaryButtonProps extends ButtonProps {
  label: string;
  danger?: boolean;
}

const StyledSecondaryButton = styled(Button, {
  name: 'RSecondaryButton',
  borderWidth: 0,
  fontWeight: '500',
  fontSize: 16,
  padding: 2,
  borderRadius: 8,
  cursor: 'pointer',

  hoverStyle: {
    opacity: 0.8,
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
        fontSize: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      lg: {
        fontSize: 14,
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
  danger,
  ...props
}) => {
  const { currentTheme } = useTheme();

  const dynamicStyle = {
    backgroundColor: currentTheme.colors.background,
    color: danger ? 'red' : currentTheme.colors.text,
  };

  return (
    <StyledSecondaryButton
      disabled={disabled}
      size={size}
      style={dynamicStyle}
      {...props}
    >
      {label}
    </StyledSecondaryButton>
  );
};

export default RSecondaryButton;
