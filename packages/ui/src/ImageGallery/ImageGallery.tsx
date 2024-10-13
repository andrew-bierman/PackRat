import React, { type FC } from 'react';
import { XStack } from 'tamagui';
import Image from 'react-native-fast-image';
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
      {images?.length > 1 ? (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginHorizontal: 16,
            opacity: images?.length > 1 ? 1 : 0,
          }}
          onPress={goPrev}
        >
          <ArrowLeft size={12} />
        </TouchableOpacity>
      ) : null}
      <Image
        source={{ uri: activeImageSrc }}
        resizeMode="contain"
        style={{ flex: 1, width: '100%' }}
      />
      {images?.length > 1 ? (
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginHorizontal: 16,
          }}
          onPress={goNext}
        >
          <ArrowRight />
        </TouchableOpacity>
      ) : null}
    </XStack>
  );
};
