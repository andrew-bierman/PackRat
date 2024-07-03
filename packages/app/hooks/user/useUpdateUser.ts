import { useUserSetter } from 'app/auth/hooks';
import { queryTrpc } from 'app/trpc';

export const useUpdateUser = () => {
  const { mutateAsync: mutateUserAsync } = queryTrpc.editUser.useMutation();
  const setUser = useUserSetter();

  const updateUser = async (user) => {
    try {
      const { userId, ...rest } = user;
      const updatedUser = await mutateUserAsync({ id: userId, ...rest });
      // @ts-ignore
      setUser(updatedUser);
      return updatedUser; // Return the updated user or a value to indicate success
    } catch (error) {
      console.error('Failed to update the user');
      throw error;
    }
  };

  return updateUser;
};
