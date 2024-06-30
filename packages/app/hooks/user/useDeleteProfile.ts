import { queryTrpc } from '../../trpc';
import { useAuthUser } from '../../auth/hooks/useUser';

export const useDeleteProfile = () => {
  const user = useAuthUser();
  const { mutateAsync: deleteUserAsync, isLoading } =
    queryTrpc.deleteUser.useMutation();

  const deleteProfile = async () => {
    try {
      await deleteUserAsync({ userId: user?.id });
      // TODO add logout
    } catch {}
  };

  return { deleteProfile, isLoading };
};
