import { queryTrpc } from '../../trpc';

export const useAddNewPack = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.addPack.useMutation({
    onMutate: async (newPack) => {
      utils.getPacks.cancel({
        ownerId: newPack.owner_id,
        queryBy: '',
      });
      // Step 1: Define optimistic update
      const optimisticUpdate = {
        ...newPack,
        id: Date.now(),
      };
      console.log('Optimistic update');
      console.log(newPack);

      const oldQueryData = utils.getPacks.getData({
        ownerId: newPack.owner_id,
        queryBy: '',
      });

      const newQueryData = {
        ...oldQueryData,
        packs:  oldQueryData?.packs ? [...oldQueryData.packs, optimisticUpdate] : [optimisticUpdate],
      };
      console.log(newQueryData);
      utils.getPacks.setData(
        {
          ownerId: newPack.owner_id,
          queryBy: '',
        },
        (oldQueryData) => newQueryData,
      );
      return {
        oldQueryData,
      };
    },
    onError: (_error, _pack, context) => {
      console.log('error');
      console.log(context.oldQueryData);
      utils.getPacks.setData(
        {
          ownerId: _pack.owner_id,
          queryBy: '',
        },
        (oldQueryData) => context.oldQueryData,
      );
    },
    onSuccess: (result) => {
      console.log('Success:', result);
      utils.getPacks.invalidate();
    },
  });
  return {
    mutation,
    addNewPack: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
