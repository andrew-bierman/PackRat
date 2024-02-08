import { useMemo } from 'react';

const useAspectRatio = (width, originalWidth, originalHeight) => {
  return useMemo(() => {
    const aspectRatio = originalHeight / originalWidth;
    const newHeight = width * aspectRatio;

    return newHeight;
  }, [width, originalWidth, originalHeight]);
};

export default useAspectRatio;
