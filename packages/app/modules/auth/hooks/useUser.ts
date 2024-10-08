import { useState } from 'react';
import { useStorage } from 'app/hooks/storage/useStorage';
import { queryTrpc } from 'app/trpc';
import { useLogout } from './useLogout';

export const useAuthUserToken = () => {
  const [[isLoading, token]] = useStorage<string>('token');

  return { token, isLoading };
};

export const useUserQuery = () => {
  const { isLoading: isTokenLoading } = useAuthUserToken();
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout();

  const { refetch, data } = queryTrpc.getMe.useQuery(undefined, {
    onSuccess: () => {
      setIsLoading(false);
    },
    onError: () => {
      logout();
      setIsLoading(false);
    },
    enabled: isTokenLoading === undefined || isTokenLoading,
    retry: false,
  });

  return { user: data, isLoading, refetch };
};

export const useAuthUser = () => {
  const { user } = useUserLoader();

  return user;
};

export const useUserLoader = () => {
  const { data: user, isLoading } = queryTrpc.getMe.useQuery(undefined, {
    enabled: false,
    notifyOnChangeProps: 'all',
  });

  return { user, isLoading };
};
