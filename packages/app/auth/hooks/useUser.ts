import { useStorage } from 'app/hooks/storage/useStorage';
import { queryTrpc } from 'app/trpc';

export const useAuthUserToken = () => {
  const [[isLoading, token]] = useStorage<string>('token');

  return { token, isLoading };
};

export const useUserQuery = () => {
  const { token, isLoading: isTokenLoading } = useAuthUserToken();
  const isRequestEnabled = !!token && !isTokenLoading;

  const { data, isLoading: isRequestLoading } = queryTrpc.getMe.useQuery(null, {
    enabled: isRequestEnabled,
  });

  // Sometimes the isLoading state don't work as expected so we have this solution here
  // isLoading stays true when request is not enabled
  // TODO fix loading state
  const isLoading = (isRequestEnabled && isRequestLoading) || isTokenLoading;

  return { user: data, isLoading };
};

export const useAuthUser = () => {
  const { user } = useUserQuery();

  return user;
};
