import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { api } from 'app/constants/api';
import { useUserSetter } from 'app/auth/hooks';

export const useUpdateUser = () => {
  const { mutateAsync: mutateUserAsync } = useMutation({
    mutationFn: updateUserMutation,
  });
  const setUser = useUserSetter();

  const updateUser = (user) => {
    (async () => {
      try {
        const updatedUser = await mutateUserAsync(user);
        setUser(updatedUser);
      } catch {
        console.error('Failed to update the user');
      }
    })();
  };

  return updateUser;
};

const updateUserMutation = async (user) => {
  const response = await axios.put(`${api}/user/`, user);
  return response.data;
};
