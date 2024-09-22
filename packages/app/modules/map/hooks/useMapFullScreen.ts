import { useState } from 'react';

export const useMapFullScreen = (defaultMode: boolean = false) => {
  const [isFullScreenMode, setIsFullScreenMode] = useState(defaultMode);

  const toggleFullScreen = () => setIsFullScreenMode((prev) => !prev);

  return { isFullScreenMode, toggleFullScreen };
};
