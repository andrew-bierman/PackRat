import { useState } from 'react';

export const useImageGallery = (images) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeImageSrc = images[currentIndex];

  const goNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return { goNext, goPrev, activeImageSrc };
};
