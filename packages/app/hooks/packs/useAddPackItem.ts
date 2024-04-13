import { queryTrpc } from '../../trpc';

export const useAddPackItem = () => {
  const utils = queryTrpc.useContext();

  // Use mutation for adding an item
  const mutation = queryTrpc.addItem.useMutation({
    onMutate: async (newItem) => {
      // Snapshot the previous value before the mutation

      const previousPack = utils.getPackById.getData({
        packId: newItem.packId,
      });
      console.log('previus data');
      console.log(previousPack);
      const newQueryData = {
        ...previousPack,
        items: [
          ...(previousPack?.items ?? []),
          {
            ...newItem,
            owners: [],
            global: false,
            packs: [newItem._id],
            _id: Date.now().toString(),
            category: newItem.type
              ? {
                  name: newItem.type,
                }
              : undefined,
          },
        ],
      };
      console.log(newQueryData);
      utils.getPackById.setData({ packId: newItem.packId }, newQueryData);
      return {
        previousPack,
      };
    },
    onError: (err, newItem, context) => {
      console.log('Error');
      console.log(err);
      if (context.previousPack) {
        utils.getPackById.setData(
          { packId: newItem.packId },
          context.previousPack,
        );
      }
    },
    onSuccess: () => {
      utils.getPackById.invalidate();
      utils.getPacks.invalidate();
    },
  });

  // Return the mutate function and other relevant properties
  return {
    mutation,
    addPackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
