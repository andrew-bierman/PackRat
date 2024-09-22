import { useState } from 'react';

export const useMapFullScreen = () => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(false);

  const toggleFullScreen = () => setIsFullScreenMode((prev) => !prev);

  return { isFullScreenMode, toggleFullScreen };
};
