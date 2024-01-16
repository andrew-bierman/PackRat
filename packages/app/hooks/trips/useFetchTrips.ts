import { queryTrpc } from '../../trpc';

export const usefetchTrips = (owner_id) => {
  const enabled = !!owner_id;

  const { isLoading, isError, data, error } = queryTrpc.getTrips.useQuery(
    { owner_id },
    {
      enabled,
      keepPreviousData: true,
    },
  );

  return { isLoading, isError, data, error };
};
