import { queryTrpc } from 'app/trpc';

export const useUpdateUserPassword = () => {
  const { mutate: mutateUser } = queryTrpc.updatePassword.useMutation();

  return mutateUser;
};
