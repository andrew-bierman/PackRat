// import { useStorage } from 'app/hooks/storage/useStorage';
// import { queryTrpc } from 'app/trpc';
// import { useMemo } from 'react';

// export const useAuthUserToken = () => {
//   const [[isLoading, token]] = useStorage<string>('token');

//   const memorizedToken = useMemo(() => token, [token]);
//   const memorizedLoading = useMemo(() => isLoading, [isLoading]);

//   return { token: memorizedToken, isLoading: memorizedLoading };
// };

// export const useUserQuery = () => {
//   const { token, isLoading: isTokenLoading } = useAuthUserToken();
//   // const isRequestEnabled = !!token && !isTokenLoading;
//   const isRequestEnabled = useMemo(() => !!token && !isTokenLoading, [token, isTokenLoading]);
//   console.log('isRequestEnabled', isRequestEnabled)
//   const {
//     refetch,
//     data,
//     isLoading: isRequestLoading,
//   } = queryTrpc.getMe.useQuery(undefined, {
//     enabled: isRequestEnabled,
//   });
//   // Sometimes the isLoading state don't work as expected so we have this solution here
//   // isLoading stays true when request is not enabled
//   // TODO fix loading state
//   const isLoading = useMemo(() => {
//     return (isRequestEnabled && isRequestLoading) || isTokenLoading === undefined || isTokenLoading;
//   }, [isRequestEnabled, isRequestLoading, isTokenLoading]);

//   return { user: data, isLoading, refetch };
// };

// export const useAuthUser = () => {
//   const { user, isLoading, refetch } = useUserQuery();

//   return useMemo(() => user, [user]);
// };


import { useEffect, useState, useMemo } from 'react';
import { useStorage } from 'app/hooks/storage/useStorage';
import { queryTrpc } from 'app/trpc';

export const useAuthUserToken = () => {
  const [[isLoading, token]] = useStorage<string>('token');
  
  // Log for debugging purposes
  useEffect(() => {
    console.log('Token loading:', isLoading, 'Token value:', token);
  }, [isLoading, token]);

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
    console.log('isRequestEnabled', isRequestEnabled);
  }, [token, isTokenLoading]);

  const { refetch, data, isLoading: isRequestLoading } = queryTrpc.getMe.useQuery(undefined, {
    enabled: isRequestEnabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const isLoading = useMemo(() => {
    return isTokenLoading || (isRequestEnabled && isRequestLoading);
  }, [isTokenLoading, isRequestEnabled, isRequestLoading]);

  // Debugging to check the status
  useEffect(() => {
    console.log('isRequestLoading:', isRequestLoading);
    console.log('user data:', data);
  }, [isRequestLoading, data]);

  return { user: data, isLoading, refetch };
};

export const useAuthUser = () => {
  const { user } = useUserQuery();
  
  return useMemo(() => user, [user]);
};
