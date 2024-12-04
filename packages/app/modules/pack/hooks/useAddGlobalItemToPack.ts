import { queryTrpc } from 'app/trpc';

export const useAddGlobalItemToPack = ({ onSuccess, onError }) => {
  const utils = queryTrpc.useUtils();

  const mutation = queryTrpc.addGlobalItemToPack.useMutation({
    onSuccess: () => {
      utils.getPackById.invalidate();
      onSuccess();
    },
    onError,
  });

  return {
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    addGlobalItemToPack: mutation.mutate,
  };
};
