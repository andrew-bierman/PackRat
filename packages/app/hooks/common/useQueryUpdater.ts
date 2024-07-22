import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

export const useQueryUpdater = (key, params, type = 'query') => {
  const queryClient = useQueryClient();
  const queryKey = getQueryKey(key, params, type as any);

  const handleUpdateQuery = (updateFunction) => {
    queryClient.setQueryData(queryKey, updateFunction);
  };

  return handleUpdateQuery;
};
