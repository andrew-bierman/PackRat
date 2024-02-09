import { useStorage } from 'app/hooks/storage/useStorage';
import { queryTrpc } from 'app/trpc';

export const useUserQuery = () => {
  const { data: user, isLoading } = queryTrpc.getMe.useQuery(); // TODO move to custom hook. Might need to fix backend to return user object based on token

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
