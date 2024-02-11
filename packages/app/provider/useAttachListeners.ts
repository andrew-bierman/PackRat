import { useNetworkStatusProvider } from 'app/hooks/offline';
import { useProgressListener } from 'app/global-state/progressStore';

export const useAttachListeners = () => {
  useNetworkStatusProvider();
  useProgressListener();
};
