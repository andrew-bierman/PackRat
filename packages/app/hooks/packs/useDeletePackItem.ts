import { queryTrpc } from '../../trpc';

export const useDeletePackItem = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.deleteItem.useMutation({
    onMutate: async (deleteItem) => {
      const previousPack = utils.getPackById.getData({
        packId: deleteItem.packId,
      });
      const itemIndex = previousPack.items.findIndex(
        (item) => item._id === deleteItem.itemId,
      );
      if (itemIndex === -1) {
        return {
          previousPack,
        };
      }
      const newQueryData = {
        ...previousPack,
        items: previousPack.items.filter((item, index) => {
          return index !== itemIndex;
        }),
        validatorPack: deleteItem.packId,
      };
      utils.getPackById.setData({ packId: deleteItem.packId }, newQueryData);

      return {
        previousPack,
      };
    },
    onError: (err, deleteItem, context) => {
      if (context.previousPack) {
        utils.getPackById.setData(
          { packId: deleteItem.packId },
          context.previousPack,
        );
      }
    },
    onSuccess: (result) => {
      utils.getPackById.invalidate();
    },
  });

  return {
    mutation,
    deletePackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
