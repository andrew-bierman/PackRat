import { queryTrpc } from 'app/trpc';

export const useEditPack = () => {
  const utils = queryTrpc.useUtils();

  const mutation = queryTrpc.editPack.useMutation();

  const editPack = (
    updatedPack,
    options?: { onSuccess?: (queryUtils: typeof utils) => void },
  ) => {
    mutation.mutate(updatedPack, {
      onSuccess: () => {
        utils.getPacks.invalidate();
        utils.getUserPacksFeed.invalidate();
        options?.onSuccess?.(utils);
      },
    });
  };

  return { editPack, ...mutation };
};
