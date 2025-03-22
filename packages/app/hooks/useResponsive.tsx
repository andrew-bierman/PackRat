import { useMedia } from 'tamagui';

const useResponsive = () => {
  const {
    xxxs,
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    gtXs,
    gtSm,
    gtMd,
    gtLg,
    short,
    tall,
    hoverNone,
    pointerCoarse,
  }: any = useMedia();

  return {
    xxxs,
    xxs,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    gtXs,
    gtSm,
    gtMd,
    gtLg,
    short,
    tall,
    hoverNone,
    pointerCoarse,
  };
};

export default useResponsive;
