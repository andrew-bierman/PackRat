import { queryTrpc } from 'app/trpc';

export const useDeletePackItem = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.deleteItemFromPack.useMutation({
    onSuccess: (result) => {
      utils.getPackById.invalidate();
      utils.getTripById.invalidate();
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
