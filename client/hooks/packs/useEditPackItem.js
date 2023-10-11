import { queryTrpc } from '../../trpc';

export const useEditPackItem = () => {
  const utils = queryTrpc.useContext();

  const mutation = queryTrpc.editItem.useMutation({
    onMutate: async (editedItem) => {
      const previousPack = utils.getPackById.getData({
        packId: editedItem.packId,
      });
      console.log(editedItem.packId);
      console.log(editedItem._id);
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

      if (context.previousPack) {
        // Restore the previous pack data in case of an error
        utils.getPackById.setData(
          { packId: editedItem.packId },
          context.previousPack,
        );
      }
    },
    onSuccess: (result) => {
      console.log(result);
      // Invalidate relevant queries after a successful edit
      utils.getPackById.invalidate({ packId: result._id });
    },
  });

  // Return the mutate function and other relevant properties
  return {
    mutation,
    editPackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
