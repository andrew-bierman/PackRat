import { queryTrpc } from 'app/trpc';

export const useEditPack = () => {
  const utils = queryTrpc.useUtils();

  const mutation = queryTrpc.editPack.useMutation();

  const editPack = (updatedPack) => {
    mutation.mutate(updatedPack, {
      onSuccess: () => {
        utils.getPacks.invalidate();
      },
    });
  };

  return { editPack, ...mutation };
};
