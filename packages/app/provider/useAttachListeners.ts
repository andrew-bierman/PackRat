import { useProgressListener } from '../atoms/progressStore';

export const useAttachListeners = () => {
  useProgressListener();
};
