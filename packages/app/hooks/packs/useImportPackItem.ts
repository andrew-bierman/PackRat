import { queryTrpc } from '../../trpc';

export const useImportPackItem = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.importItems.useMutation({
    onMutate: async (newItem) => {
      if (!newItem) {
        throw new Error('Item data is not available.');
      }

      // Optionally: Perform optimistic update IF NEEDED

      return {
        // No need to store previous state if not doing optimistic updates
      };
    },
    onSuccess: (data, newItem, context) => {
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

      utils.getPackById.invalidate();
      utils.getPacks.invalidate();
    },
    onError: (error, newItem, context) => {
      console.error('Error adding item:', error);

      // Optionally: Rollback optimistic update here if implemented
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
