import { Storage } from 'app/utils/storage';
import { getQueryKey } from '@trpc/react-query';
import { queryClient, queryTrpc } from 'app/trpc';

export const logoutAuthUser = () => {
  Storage.removeItem('token');
  queryClient.setQueriesData(
    getQueryKey(queryTrpc.getMe, undefined, 'query'),
    null,
  );
  queryClient.invalidateQueries();
};
