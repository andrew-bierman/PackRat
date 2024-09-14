import { Storage } from 'app/utils/storage';
import { getQueryKey } from '@trpc/react-query';
import { queryClient, queryTrpc, vanillaTrpcClient } from 'app/trpc';

export const logoutAuthUser = async () => {
  await vanillaTrpcClient.logout.query(await Storage.getItem('refreshToken'));
  await Storage.removeItem('token');
  await Storage.removeItem('refreshToken');
  queryClient.setQueriesData(
    getQueryKey(queryTrpc.getMe, undefined, 'query'),
    null,
  );
  queryClient.invalidateQueries();
};
