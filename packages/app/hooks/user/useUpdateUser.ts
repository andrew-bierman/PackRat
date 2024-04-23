import { useUserSetter } from 'app/auth/hooks';
import { queryTrpc } from 'app/trpc';

export const useUpdateUser = () => {
  const { mutateAsync: mutateUserAsync } = queryTrpc.editUser.useMutation();
  const setUser = useUserSetter();

  const updateUser = (user) => {
    (async () => {
      try {
        const { userId, ...rest } = user;
        const updatedUser = await mutateUserAsync({ id: userId, ...rest });
        // @ts-ignore
        setUser(updatedUser);
      } catch {
        console.error('Failed to update the user');
      }
    })();
  };

  return updateUser;
};
