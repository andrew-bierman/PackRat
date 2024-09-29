import { useEffect, useState, useMemo } from 'react';
import { useStorage } from 'app/hooks/storage/useStorage';
import { queryTrpc } from 'app/trpc';

export const useAuthUserToken = () => {
  const [[isLoading, token]] = useStorage<string>('token');

  return { token, isLoading };
};

export const useUserQuery = () => {
  const { token, isLoading: isTokenLoading } = useAuthUserToken();

  const [isRequestEnabled, setIsRequestEnabled] = useState(false);
  useEffect(() => {
    if (!isTokenLoading && token) {
      setIsRequestEnabled(true);
    } else {
      setIsRequestEnabled(false);
    }
  }, [token, isTokenLoading]);

  const { refetch, data, isLoading: isRequestLoading } = queryTrpc.getMe.useQuery(undefined, {
    enabled: isRequestEnabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isLoading = useMemo(() => {
    return isTokenLoading || (isRequestEnabled && isRequestLoading);
  }, [isTokenLoading, isRequestEnabled, isRequestLoading]);

  return { user: data, isLoading, refetch };
};

export const useAuthUser = () => {
  const { user } = useUserQuery();
  
  return useMemo(() => user, [user]);
};
