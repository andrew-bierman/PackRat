import { useRunQueryItem } from './useRunQueueItem';
import { useOfflineStore } from '../../atoms';

// Define the type for a request
type Request = {
  method: string;
  data: any;
};

export const useOfflineQueue = () => {
  const { connectionStatus, requests, setRequests } = useOfflineStore() as {
    connectionStatus: string;
    requests: Request[];
    setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  };

  const runQueryItem = useRunQueryItem();
  const processQueue = () => {
    const queuePromises: (() => Promise<any>)[] = [];
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

  const handleAddOfflineRequest = (method: string, data: any) => {
    setRequests((prev: Request[]) => [...prev, { method, data }]);
  };

  return {
    isConnected: connectionStatus === 'connected',
    addOfflineRequest: handleAddOfflineRequest,
    processQueue,
  };
};
