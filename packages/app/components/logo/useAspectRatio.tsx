import { useMemo } from 'react';

const useAspectRatio = (
  width: number,
  originalWidth: number,
  originalHeight: number,
): number => {
  return useMemo(() => {
    const aspectRatio = originalHeight / originalWidth;
    const newHeight = width * aspectRatio;

    return newHeight;
  }, [width, originalWidth, originalHeight]);
};

export default useAspectRatio;
