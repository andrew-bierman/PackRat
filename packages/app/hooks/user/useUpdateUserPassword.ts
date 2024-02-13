import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { api } from 'app/constants/api';

export const useUpdateUserPassword = () => {
  const { mutate: mutateUser } = useMutation({
    mutationFn: updateUserMutation,
  });

  return mutateUser;
};

const updateUserMutation = async (data) => {
  const response = await axios.post(`${api}/user/updatepassword`, data);
  return response.data;
};
