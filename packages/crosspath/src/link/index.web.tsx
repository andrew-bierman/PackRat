import { Platform } from 'react-native';
import { NEXT_PUBLIC_ROUTER } from '@env';
import { SolitoLink } from './SolitoLink';
import { TanStackLink } from './TanStackLink';

function useLinkFactory() {
  if (NEXT_PUBLIC_ROUTER === 'solito') {
    return SolitoLink;
  } else {
    return TanStackLink;
  }
}

export const Link = useLinkFactory();
