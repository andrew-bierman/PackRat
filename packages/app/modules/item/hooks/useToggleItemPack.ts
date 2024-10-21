import { queryTrpc } from 'app/trpc';

export const useTogglePackItem = () => {
  const utils = queryTrpc.useContext();
  const mutation = queryTrpc.toggleItemPack.useMutation({
    onSuccess: () => {
      utils.getUserPacksFeed.invalidate();
      utils.getPackById.invalidate();
    },
  });

  return {
    mutation,
    togglePackItem: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
