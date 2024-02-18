import { useNetworkStatusProvider } from 'app/hooks/offline';
import { useProgressListener } from '../atoms/progressStore';

export const useAttachListeners = () => {
  useNetworkStatusProvider();
  useProgressListener();
};
