import { queryTrpc } from 'app/trpc';

export const useImportPackItem = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.importItems.useMutation({
    onMutate: async (newItem) => {
      if (!newItem) {
        throw new Error('Item data is not available.');
      }

      const previousPack = utils.getPackById.getData({
        packId: newItem.packId,
      });

      const newQueryData = {
        ...previousPack,
        items: [
          ...(previousPack?.items ?? []),
          {
            ...newItem,
            owners: [],
            global: false,
            packs: [newItem.id],
            id: Date.now().toString(),
            category: newItem.type ? { name: newItem.type } : null,
          },
        ],
      };

      utils.getPackById.setData(
        { packId: newItem.packId },
        newQueryData as any,
      );

      return {
        previousPack,
      };
    },
    onSuccess: () => {
      utils.getPackById.invalidate();
      utils.getPacks.invalidate();
    },
  });

  return {
    mutation,
    importPackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
