import { useStorage } from 'app/hooks/storage/useStorage';
import { useGetMe } from './useGetMe';

export const useUserQuery = () => {
  const { data: user, isLoading } = useGetMe();

  return { isLoading, user };
};

export const useAuthUserToken = () => {
  const [[isLoading, token]] = useStorage('token');

  return { token, isLoading };
};

export const useAuthUser = () => {
  const { user } = useUserQuery();

  return user;
};
