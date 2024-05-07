import { queryTrpc } from 'app/trpc';
import { useCallback } from 'react';
import { useOfflineQueue } from 'app/hooks/offline';
import { useItemsUpdater } from './useItemsUpdater';

export const useDeleteItem = () => {
  const { mutate } = queryTrpc.deleteGlobalItem.useMutation();
  const utils = queryTrpc.useContext();
  const { isConnected, addOfflineRequest } = useOfflineQueue();
  const updateItems = useItemsUpdater();

  const handleDeleteItem = useCallback(
    (itemId, onSuccess = () => {}) => {
      if (isConnected) {
        return mutate(
          { itemId },
          {
            onSuccess: () => {
              utils.getItemsGlobally.invalidate();
              onSuccess();
            },
          },
        );
      }

      addOfflineRequest('deleteGlobalItem', { itemId });

      updateItems((prevState = {}) => {
        onSuccess();
        const prevItems = Array.isArray(prevState.items) ? prevState.items : [];

        return {
          ...prevState,
          items: prevItems.filter(({ id }) => id !== itemId),
        };
      });
    },
    [updateItems],
  );

  return { handleDeleteItem };
};
