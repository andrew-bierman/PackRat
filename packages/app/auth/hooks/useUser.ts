import { queryTrpc } from 'app/trpc';
import { useStorage } from 'app/hooks/storage/useStorage';

export const useUserQuery = () => {
  const [[isLoading, user]] = useStorage('session');

  return { isLoading, user };
};

export const useAuthUser = () => {
  const { user } = useUserQuery();

  return user;
};
