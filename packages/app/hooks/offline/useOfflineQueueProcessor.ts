import { useEffect } from 'react';
import { useOfflineQueue } from './useOfflineQueue';

export const useOfflineQueueProcessor = () => {
  const { isConnected, processQueue } = useOfflineQueue();

  useEffect(() => {
    if (isConnected) {
      processQueue();
    }
  }, [isConnected]);
};
