import { queryTrpc } from '../../trpc';
import { useQueryClient } from '@tanstack/react-query';

export const useAddPackItem = (ownerId, packId) => {
  const queryClient = useQueryClient();

  // Use query to get specific pack by its ID
  const pack = queryTrpc.getPackById.useQuery(
    { packId },
    {
      enabled: !!packId, // Ensure the query runs only when packId is available
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  // Use query to get all packs for the given owner
  const allPacks = queryTrpc.getPacks.useQuery(
    { ownerId },
    {
      enabled: !!ownerId, // This query will run only if 'enabled' is true.
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const utils = queryTrpc.useContext();

  // Use mutation for adding an item
  const mutation = queryTrpc.addItem.useMutation({
    onMutate: async (newItem) => {
      //   // Your logic for optimistically updating the UI can go here
      //   // For example, canceling outgoing refetches, snapshotting previous values, etc.
      //   // Cancel any outgoing refetches to prevent them from overwriting our optimistic update
      //   await queryClient.cancelQueries(['getPackById', packId]);
      //   await queryClient.cancelQueries(['getPacks', ownerId]);
      //   // Snapshot the previous values for potential rollback in case of error
      //   const previousPack = queryClient.getQueryData(['getPackById', packId]);
      //   const previousPacks = queryClient.getQueryData(['getPacks', ownerId]);
      //   // Optimistically update the data with the new item
      //   queryClient.setQueryData(['getPackById', packId], (old) => ({
      //       ...old,
      //       items: [...old.items, newItem],
      //   }));
      //   queryClient.setQueryData(['getPacks', ownerId], (old) => ({
      //       ...old,
      //       packs: [...old.packs, newItem],
      //   }));
      //   // Return a context object with the snapshotted values for use in the onError callback
      //   return { previousPack, previousPacks };
    },
    onError: (err, newItem, context) => {
      // Rollback to the previous value if the mutation didn't succeed
      if (context.previousPack) {
        utils.setQueryData(['getPackById', packId], context.previousPack);
      }
    },
    onSuccess: () => {
      console.log('success in hook!!!');
      // Invalidate queries to refetch the latest data after mutation success
      utils.invalidateQueries(['getPackById', packId]);
      utils.invalidateQueries(['getPacks', ownerId]);
      utils.invalidateQueries(['getPackById', { packId: packId }], {
        refetchActive: true,
      });
      utils.invalidateQueries(['getPacks', ownerId], { refetchActive: true });
    },
  });

  // Return the mutate function and other relevant properties
  return {
    mutation,
    addPackItem: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    pack,
    allPacks,
  };
};
