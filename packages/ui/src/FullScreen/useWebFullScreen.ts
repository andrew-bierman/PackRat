import { useRef } from 'react';

export const useWebFullScreen = () => {
  const elementRef = useRef<HTMLElement>(null);

  const enterFullScreen = () => {
    const element = elementRef.current;
    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element && element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element && element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element && element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return { enterFullScreen, exitFullScreen, elementRef };
};
