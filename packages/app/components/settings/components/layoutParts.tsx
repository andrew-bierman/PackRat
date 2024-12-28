import { View, styled } from 'tamagui';
import { useMedia } from 'tamagui';
import type { MediaQueryKey } from '@tamagui/web';

export const FormCard = styled(View, {
  tag: 'form',
  flexDirection: 'row',
  maxWidth: '100%',
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '$6',
  $gtSm: {
    shadowColor: '$shadowColor',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
  },
  '$theme-dark': {
    borderWidth: 1,
    borderColor: '$borderColor',
  },
  $xs: {
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: '$1',
  },
});

export const Hide = async ({
  children,
  when = 'sm',
}: {
  children: React.ReactNode;
  when: MediaQueryKey;
}) => {
  const hide = useMedia()[when];

  if (hide) {
    return null;
  }
  return children;
};
