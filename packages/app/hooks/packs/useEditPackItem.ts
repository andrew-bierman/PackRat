import { queryTrpc } from '../../trpc';
import { useItemsUpdater } from 'app/hooks/items';
import { useOfflineQueue } from 'app/hooks/offline';

// TODO refactor pack / items, separate logic
export const useEditPackItem = (isItemPage) => {
  const utils = queryTrpc.useContext();
  const updateItems = useItemsUpdater();

  const mutation = queryTrpc.editItem.useMutation({
    onMutate: async (editedItem) => {
      if (!editedItem.packId) {
        return;
      }
      const previousPack = utils.getPackById.getData({
        packId: editedItem.packId,
      });
      const itemIndex = previousPack.items.findIndex(
        (item) => item._id === editedItem._id,
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
              category: editedItem.type ? {
                name: editedItem.type
              } : undefined
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
      console.log('Error');
      console.log(err);

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

    updateItems((prevState = {}) => {
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
