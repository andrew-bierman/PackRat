import { useRef } from 'react';

export const useWebFullScreen = () => {
  const elementRef = useRef<HTMLElement>(null);

  const enterFullScreen = () => {
    const element = elementRef.current;
    if (element && element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element && (element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if (element && (element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if (element && (element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  return { enterFullScreen, exitFullScreen, elementRef };
};
