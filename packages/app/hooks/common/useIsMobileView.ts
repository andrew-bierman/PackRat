import { useMedia } from 'tamagui';

export const useIsMobileView = () => {
  const media = useMedia();

  return media.md;
};
