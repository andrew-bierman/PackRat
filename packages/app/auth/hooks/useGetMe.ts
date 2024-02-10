import { queryTrpc } from '../../trpc';
import { useStorage } from 'app/hooks/storage/useStorage';

export const useGetMe = () => {
  const [[_, token]] = useStorage('token'); // TODO add enabled based on token to avoid unneeded requests

  const { data, isLoading } = queryTrpc.getMe.useQuery();

  return { data, isLoading };
};
