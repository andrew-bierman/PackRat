import { useMedia } from 'tamagui';
import { useScreenWidth } from '../useScreenWidth';

export const useIsMobileView = () => {
  const media = useMedia();

  const { screenWidth } = useScreenWidth();

  return screenWidth < 1900; // hard coded for now, will be replaced with media queries
};
