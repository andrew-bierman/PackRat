import { queryTrpc } from 'app/trpc';
import { useCallback, useEffect } from 'react';

export const useAddItem = () => {
  const { mutate } = queryTrpc.addItemGlobal.useMutation();
  const utils = queryTrpc.useContext();

  const handleDeleteItem = useCallback((newItem, onSuccess) => {
    mutate(newItem, {
      onSuccess: () => {
        utils.getItemsGlobally.invalidate();
        onSuccess();
      },
    });
  }, []);

  return { handleDeleteItem };
};
