import { useDispatch, useSelector } from 'react-redux';
import { useRunQueryItem } from './useRunQueueItem';
import { addOfflineRequest, setOfflineRequests } from 'app/store/offlineQueue';

export const useOfflineQueue = () => {
  const { isConnected, requests } = useSelector((state) => state.offlineQueue);
  const dispatch = useDispatch();
  const runQueryItem = useRunQueryItem();
  const processQueue = () => {
    const queuePromises = [];
    const requestsCopy = JSON.parse(JSON.stringify(requests));
    let runCount = 0;
    const onQueueEnd = () => {
      dispatch(setOfflineRequests(requestsCopy.slice(runCount + 1)));
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
    dispatch(addOfflineRequest({ method, data }));
  };

  return {
    isConnected,
    addOfflineRequest: handleAddOfflineRequest,
    processQueue,
  };
};
