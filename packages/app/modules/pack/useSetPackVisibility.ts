import { queryTrpc } from '../../trpc';

export const useSetPackVisibility = () => {
  const utils = queryTrpc.useUtils();
  const mutation = queryTrpc.editPack.useMutation();

  const setPackVisibility = (
    updatePack: { id: string; is_public: boolean; name: string },
    options?: { onSuccess?: (queryUtils: typeof utils) => void },
  ) => {
    mutation.mutate(updatePack, {
      onSuccess: () => {
        utils.getUserFavorites.invalidate();
        utils.getUserPacksFeed.invalidate();
        utils.getPublicFeed.invalidate();
        options?.onSuccess?.(utils);
      },
    });
  };

  return {
    setPackVisibility,
    ...mutation,
  };
};
