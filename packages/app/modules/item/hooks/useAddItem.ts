import { queryTrpc } from 'app/trpc';
import { useCallback } from 'react';
import { useOfflineQueue } from 'app/hooks/offline';
import { useItemsUpdater } from './useItemsUpdater';

interface State {
  items?: Array<{ id: string }>;
}

export const useAddItem = () => {
  const utils = queryTrpc.useContext();
  const { mutate } = queryTrpc.addItemGlobal.useMutation();
  const { isConnected, addOfflineRequest } = useOfflineQueue();
  const updateItems = useItemsUpdater();

  const handleAddNewItem = useCallback(
    (newItem, onSuccess) => {
      if (isConnected) {
        return mutate(newItem, {
          onSuccess: () => {
            utils.getItemsGlobally.invalidate();
            onSuccess();
          },
        });
      }

      addOfflineRequest('addItemGlobal', newItem);

      updateItems((prevState: State = {}) => {
        onSuccess();
        const prevItems = Array.isArray(prevState.items) ? prevState.items : [];

        return {
          ...prevState,
          items: [newItem, ...prevItems],
        };
      });
    },
    [updateItems],
  );

  return { handleAddNewItem };
};
