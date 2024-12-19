import { queryTrpc } from 'app/trpc';
import { useCallback } from 'react';
import { useOfflineQueue } from 'app/hooks/offline';
import { useItemsUpdater } from './useItemsUpdater';

interface State {
  items?: Array<{ id: string }>;
}

export const useImportItem = () => {
  const utils = queryTrpc.useContext();
  const { mutate } = queryTrpc.importItemsGlobal.useMutation();
  const { isConnected, addOfflineRequest } = useOfflineQueue();
  const updateItems = useItemsUpdater();

  const handleImportNewItems = useCallback(
    (newItem, onSuccess) => {
      if (isConnected) {
        return mutate(newItem, {
          onSuccess: () => {
            updateItems((prevState: State = {}) => {
              const prevItems = Array.isArray(prevState.items)
                ? prevState.items
                : [];
              return {
                ...prevState,
                items: [newItem, ...prevItems], // Use the data returned from the server
              };
            });
            utils.getItemsGlobally.invalidate();
            onSuccess();
          },
          onError: (error) => {
            console.error('Error adding item:', error);
          },
        });
      }

      addOfflineRequest('importItemsGlobal', newItem);

      // Optionally, handle offline case here if needed
    },
    [updateItems, isConnected, mutate, utils, addOfflineRequest],
  );

  return { handleImportNewItems };
};
