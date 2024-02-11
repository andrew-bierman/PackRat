import { useRunQueryItem } from './useRunQueueItem';
import { useOfflineStore } from '../../atoms';

export const useOfflineQueue = () => {
  const { isConnected, requests, setRequests } = useOfflineStore();
  const runQueryItem = useRunQueryItem();
  const processQueue = () => {
    const queuePromises = [];
    const requestsCopy = JSON.parse(JSON.stringify(requests));
    let runCount = 0;
    const onQueueEnd = () => {
      setRequests(requestsCopy.slice(runCount + 1));
    };

    requests.forEach((request) => {
      const { method, data } = request;
      queuePromises.push(runQueryItem.bind(null, method, data));
    });

    const runMutation = async (mutation) => {
      if (!mutation) {
        return onQueueEnd();
      }

      try {
        await mutation();
        runCount++;
        runMutation(requestsCopy[runCount]);
      } catch {
        onQueueEnd();
      }
    };

    runMutation(queuePromises[0]);
  };

  const handleAddOfflineRequest = (method, data) => {
    setRequests((prev) => [...prev, { method, data }]);
  };

  return {
    isConnected,
    addOfflineRequest: handleAddOfflineRequest,
    processQueue,
  };
};
