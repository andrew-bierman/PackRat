import { queryTrpc } from 'app/trpc';
import { useCallback, useEffect } from 'react';

export const useDeleteItem = () => {
  const { mutate } = queryTrpc.deleteGlobalItem.useMutation();
  const utils = queryTrpc.useContext();

  const handleDeleteItem = useCallback((itemId, onSuccess = () => {}) => {
    mutate(
      { itemId },
      {
        onSuccess: () => {
          utils.getItemsGlobally.invalidate();
          onSuccess();
        },
      },
    );
  }, []);

  return { handleDeleteItem };
};
