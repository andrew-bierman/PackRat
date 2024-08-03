import { useCallback } from 'react';
import { queryTrpc } from 'app/trpc';
import { useOfflineQueue } from 'app/hooks/offline';
import { useItemsUpdater } from './useItemsUpdater';

interface State {
  items?: Array<{ id: string }>;
}

export const useImportFromBucket = () => {
  const utils = queryTrpc.useContext();
  const { mutate } = queryTrpc.importFromBucket.useMutation();
  const { isConnected, addOfflineRequest } = useOfflineQueue();
  const updateItems = useItemsUpdater();

  const handleImportFromBucket = useCallback(
    ({ directory, ownerId }) => {
      if (isConnected) {
        return mutate(
          { directory, ownerId },
          {
            onSuccess: (data) => {
              console.log('ssssssssssssssssssssssssssssssss', data.items);
              // Ensure data.items exists and is an array
              const newItems = Array.isArray(data.items) ? data.items : [];

              // Update local state with the returned data
              updateItems((prevState: State = {}) => {
                const prevItems = Array.isArray(prevState.items)
                  ? prevState.items
                  : [];
                return {
                  ...prevState,
                  items: [...newItems, ...prevItems],
                };
              });

              // Invalidate the cache to reflect the latest state
              utils.getItemsGlobally.invalidate();
            },
            onError: (error) => {
              console.error('Error fetching items:', error);
            },
          },
        );
      } else {
        // Handle offline scenario
        addOfflineRequest('importFromBucket', { directory, ownerId });
      }
    },
    [updateItems, isConnected, mutate, utils, addOfflineRequest],
  );

  return { handleImportFromBucket };
};
