import { queryTrpc } from '../../trpc';
import { useAuthUser } from '../../auth/hooks/useUser';
import { logoutAuthUser } from 'app/utils/userUtils';

export const useDeleteProfile = () => {
  const user = useAuthUser();
  const { mutateAsync: deleteUserAsync, isLoading } =
    queryTrpc.deleteUser.useMutation();

  const deleteProfile = async () => {
    try {
      await deleteUserAsync({ userId: user?.id });
      logoutAuthUser();
    } catch {}
  };

  return { deleteProfile, isLoading };
};
