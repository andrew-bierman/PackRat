import { queryTrpc } from '../../trpc';

export const useGetPhotonDetails = (
  {
    properties,
  }: {
    properties: { osm_id: string | number; osm_type: string };
  },
  refetchOnFocus = true,
) => {
  const { osm_id = null, osm_type = null } = properties || {};
  const enabled = Boolean(osm_id && osm_type);

  const { isLoading, isFetching, isError, data, error } =
    queryTrpc.getPhotonDetails.useQuery(
      { id: osm_id as string, type: osm_type as string },
      {
        enabled,
        refetchOnWindowFocus: refetchOnFocus,
      },
    );
  return { isLoading, isFetching, isError, data, error };
};
