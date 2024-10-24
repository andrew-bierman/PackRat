import { queryTrpc } from 'app/trpc';
import { useItemsUpdater } from 'app/modules/item';
import { useOfflineQueue } from 'app/hooks/offline';

interface EditedItem {
  name: string;
  type: string;
  id: string;
  weight: number;
  quantity: number;
  unit: string;
  packId?: string;
}

// TODO refactor pack / items, separate logic
export const useEditPackItem = (isItemPage) => {
  const utils = queryTrpc.useContext();
  const updateItems = useItemsUpdater();

  const mutation = queryTrpc.editItem.useMutation({
    onMutate: async (editedItem: EditedItem) => {
      if (!editedItem.packId) {
        return;
      }
      const previousPack = utils.getPackById.getData({
        packId: editedItem.packId,
      });

      if (!previousPack) {
        throw new Error('Pack not found.');
      }

      const itemIndex = previousPack.items.findIndex(
        (item) => item.id === editedItem.id,
      );
      if (itemIndex === -1) {
        throw new Error('Item not found in the pack.');
      }
      const newQueryData = {
        ...previousPack,
        items: previousPack.items.map((item, index) => {
          if (index === itemIndex) {
            // Update the edited item properties
            return {
              ...item,
              ...editedItem,
              category: editedItem.type
                ? {
                    name: editedItem.type,
                  }
                : undefined,
            };
          }
          return item;
        }),
      };

      // Update the data in the query
      utils.getPackById.setData({ packId: editedItem.packId }, newQueryData);

      return {
        previousPack,
      };
    },
    onError: (err, editedItem, context) => {
      // if (context.previousPack) {
      //   // Restore the previous pack data in case of an error
      //   utils.getPackById.setData(
      //     { packId: editedItem.packId },
      //     context.previousPack,
      //   );
      // }
    },
    onSuccess: (result) => {
      // Invalidate relevant queries after a successful edit
      utils.getPackById.invalidate();
      utils.getTripById.invalidate();
      utils.getItemsGlobally.invalidate();
    },
  });
  const { isConnected, addOfflineRequest } = useOfflineQueue();

  const handleEditPackItem = (newItem) => {
    if (isConnected) {
      return mutation.mutate(newItem);
    }

    addOfflineRequest('editItem', newItem);

    updateItems((prevState: { items?: EditedItem[] } = {}) => {
      const prevItems = Array.isArray(prevState.items) ? prevState.items : [];

      return {
        ...prevState,
        items: prevItems.map((item) => {
          if (item.id !== newItem.id) return item;

          return newItem;
        }),
      };
    });
  };

  // Return the mutate function and other relevant properties
  return {
    mutation,
    editPackItem: isItemPage ? handleEditPackItem : mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
