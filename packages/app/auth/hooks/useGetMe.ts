import { queryTrpc } from '../../trpc';
import { useAuthUserToken } from './useUser';

export const useGetMe = () => {
  const { token, isLoading: isTokenLoading } = useAuthUserToken();

  const { data, isLoading } = queryTrpc.getMe.useQuery(null, {
    enabled: !!token && !isTokenLoading,
  });

  return { data, isLoading };
};
