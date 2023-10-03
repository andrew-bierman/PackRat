import { queryTrpc } from '../../trpc';
import { useQueryClient } from '@tanstack/react-query';

export const useAddPackItem = (ownerId, packId) => {
  const queryClient = useQueryClient();

  const pack = queryTrpc.getPackById.useQuery(
    { packId },
    {
      enabled: !!packId, // to ensure the query runs only when packId is available
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const allPacks = queryTrpc.getPacks.useQuery(
    { ownerId },
    {
      enabled: !!ownerId, // This query will run only if 'enabled' is true.
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  const utils = queryTrpc.useContext();

  const mutation = queryTrpc.addItem.useMutation({
    onMutate: async (newItem) => {
      // // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      // await queryClient.cancelQueries(['getPackById', packId]);
      // await queryClient.cancelQueries(['getPacks', ownerId]);
      // // Snapshot the previous value
      // const previousPack = queryClient.getQueryData(['getPackById', packId]);
      // const previousPacks = queryClient.getQueryData(['getPacks', ownerId]);
      // // Optimistically update to the new value
      // queryClient.setQueryData(['getPackById', packId], (old) => ({
      //     ...old,
      //     items: [...old.items, newItem],
      // }));
      // queryClient.setQueryData(['getPacks', ownerId], (old) => ({
      //     ...old,
      //     packs: [...old.packs, newItem],
      // }));
      // // Return a context object with the snapshotted value
      // return { previousPack, previousPacks };
      // await utils.cancelQueries(['getPackById', packId]);
      // const previousPack = utils.getQueryData(['getPackById', packId]);
      // console.log('previousPack', previousPack);
      // // Check if 'previousPack' and 'old.items' are defined before optimistically updating
      // if (previousPack && previousPack.items) {
      //     utils.setQueryData(['getPackById', packId], (old) => ({
      //         ...old,
      //         items: [...old.items, newItem],
      //     }));
      // }
      // return { previousPack };
    },
    onError: (err, newItem, context) => {
      if (context.previousPack) {
        utils.setQueryData(['getPackById', packId], context.previousPack);
      }
    },
    onSuccess: () => {
      utils.invalidateQueries(['getPackById', packId]);
      utils.invalidateQueries(['getPacks', ownerId]);
    },
  });
  return { mutation };
};
