import { queryTrpc } from '../../trpc';

export const useAddNewPack = () => {
  const mutation = queryTrpc.addPack.useMutation();
  return { mutation };
};
