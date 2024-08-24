import { useCallback } from 'react';
import { queryTrpc } from 'app/trpc';
import { useOfflineQueue } from 'app/hooks/offline';
import { useItemsUpdater } from './useItemsUpdater';

interface State {
  items?: Array<{ id: string }>;
}

export const useImportFromBucket = () => {
  const utils = queryTrpc.useContext();
  const { mutateAsync } = queryTrpc.importFromBucket.useMutation();
  const { isConnected, addOfflineRequest } = useOfflineQueue();
  const updateItems = useItemsUpdater();

  const handleImportFromBucket = useCallback(
    async ({ directory, ownerId }, onSuccess) => {
      if (isConnected) {
        try {
          const data = await mutateAsync({ directory, ownerId });
          const newItems = Array.isArray(data) ? data : [];
          updateItems((prevState: State = {}) => {
            const prevItems = Array.isArray(prevState.items)
              ? prevState.items
              : [];
            return {
              ...prevState,
              items: [...newItems, ...prevItems],
            };
          });

          utils.getItemsGlobally.invalidate();
          utils.getItemsGlobally.refetch();
          onSuccess();
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      } else {
        addOfflineRequest('importFromBucket', { directory, ownerId });

        updateItems((prevState: State = {}) => {
          onSuccess();
          const prevItems = Array.isArray(prevState.items)
            ? prevState.items
            : [];

          return {
            ...prevState,
            items: [
              {
                directory,
                ownerId,
                global: true,
              },
              ...prevItems,
            ],
          };
        });
      }
    },
    [updateItems, isConnected, mutateAsync, utils, addOfflineRequest],
  );

  return { handleImportFromBucket };
};
