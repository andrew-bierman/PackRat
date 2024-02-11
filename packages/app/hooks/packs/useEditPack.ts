import { queryTrpc } from 'app/trpc';

export const useEditPack = () => {
  const { mutate: mutatePack } = queryTrpc.editPack.useMutation();

  return mutatePack;
};
