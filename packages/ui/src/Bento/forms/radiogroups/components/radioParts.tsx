import { View, styled } from 'tamagui';

export const Card = styled(View, {
  variants: {
    unstyled: {
      false: {
        cursor: 'pointer',
        width: '100%',
        borderRadius: '$4',
        padding: '$3',
        backgroundColor: '$background',
        borderColor: '$borderColor',
        borderWidth: 1,
        focusStyle: {
          backgroundColor: '$backgroundFocus',
          borderColor: '$borderColorFocus',
        },
        hoverStyle: {
          backgroundColor: '$backgroundFocus',
          borderColor: '$borderColorFocus',
        },
      },
    },
    active: {
      true: {
        backgroundColor: '$backgroundFocus',
        borderColor: '$borderColorFocus',
      },
    },
  } as const,
  defaultVariants: {
    unstyled: process.env.TAMAGUI_HEADLESS === '1',
  },
});
