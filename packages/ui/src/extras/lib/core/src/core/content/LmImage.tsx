import { Image, ImageProps, Stack as OriginalStack } from 'tamagui';

export type LmImageProps = ImageProps;
const Stack: any = OriginalStack;
export function LmImage({ aspectRatio, ...props }: LmImageProps) {
  if (aspectRatio) {
    return (
      <Stack width={'100%'} aspectRatio={aspectRatio} position={'relative'}>
        <Image
          {...props}
          aspectRatio={aspectRatio}
          width={'100%!important'}
          height={'100%!important'}
          resizeMode={'contain'}
        />
      </Stack>
    );
  }
  return <Image {...props} />;
}
