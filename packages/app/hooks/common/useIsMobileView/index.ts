import { useMedia } from 'tamagui';
import { useScreenWidth } from '../useScreenWidth';

export const useIsMobileView = () => {
  const media = useMedia();

  const { screenWidth } = useScreenWidth();

  return screenWidth < 768; // hard coded for now, will be replaced with media queries
};
