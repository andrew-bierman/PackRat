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
    (newItem) => {
      if (isConnected) {
        return mutate(newItem, {
          onSuccess: () => {
            utils.getItemsGlobally.invalidate();
          },
        });
      }

      addOfflineRequest('addItemGlobal', newItem);

      updateItems((prevState: State = {}) => {
        const prevItems = Array.isArray(prevState.items) ? prevState.items : [];

        return {
          ...prevState,
          items: [newItem, ...prevItems],
        };
      });
    },
    [updateItems],
  );

  return { handleImportNewItems };
};
