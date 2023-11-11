import { queryTrpc } from "../../trpc";

export const useGetPhotonDetails = async({ properties }) => {
    const { osm_id, osm_type } = properties;
    const enabled = Boolean(osm_id && osm_type);

    const {refetch, isLoading, isError, data, error } = 
    queryTrpc.getPhotonDetails.useQuery(
            { id: osm_id, type: osm_type },
            {
                enabled
            }
        )
    
    return {refetch, isLoading, isError, data, error, geoJSON:data }
}