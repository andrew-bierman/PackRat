import { queryTrpc } from '../../trpc';

export const useAddNewPack = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.addPack.useMutation({
    onMutate: async (newPack) => {
      utils.getPacks.cancel({
        ownerId: newPack?.owner_id,
        queryBy: '',
      });
      const optimisticUpdate = {
        ...newPack,
        id: Date.now(),
      };

      const oldQueryData = utils.getPacks.getData({
        ownerId: newPack?.owner_id,
        queryBy: '',
      });

      const newQueryData = {
        ...oldQueryData,
        packs:
          oldQueryData && oldQueryData.packs
            ? [...oldQueryData?.packs, optimisticUpdate]
            : [optimisticUpdate],
      };
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
      utils.getPacks.invalidate();
    },
  });
  return {
    mutation,
    addNewPack: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    response: mutation.data,
  };
};
