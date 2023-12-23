import { queryTrpc } from '../../trpc';

export const useGetPhotonDetails = ({ properties }) => {
  const { osm_id = null, osm_type = null } = properties || {};
  const enabled = Boolean(osm_id && osm_type);

  const { isLoading, isError, data, error } =
    queryTrpc.getPhotonDetails.useQuery(
      { id: osm_id, type: osm_type },
      {
        enabled,
      },
    );
  return { isLoading, isError, data, error };
};
