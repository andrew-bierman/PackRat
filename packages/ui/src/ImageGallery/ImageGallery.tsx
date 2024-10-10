import React, { type FC } from 'react';
import { Image, XStack } from 'tamagui';
import { useImageGallery } from './useImageGallery';
import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: FC<ImageGalleryProps> = ({ images }) => {
  const { activeImageSrc, goPrev, goNext } = useImageGallery(images);

  return (
    <XStack style={{ width: '100%', flex: 1, gap: 10 }}>
      <TouchableOpacity
        style={{ alignSelf: 'center', marginHorizontal: 16 }}
        onPress={goPrev}
      >
        <ArrowLeft />
      </TouchableOpacity>
      <Image
        source={{ uri: activeImageSrc }}
        width="100%"
        resizeMode="contain"
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        style={{ alignSelf: 'center', marginHorizontal: 16 }}
        onPress={goNext}
      >
        <ArrowRight />
      </TouchableOpacity>
    </XStack>
  );
};
