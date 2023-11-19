import { queryTrpc } from "../../trpc";

export const useGetDestination = async({destinationId,properties}) => {
    const { osm_id, osm_type } = properties;
    const enabled = Boolean(osm_id && osm_type && destinationId && destinationId !== 'query');

    const {refetch, isLoading, isError, data, error } = 
    queryTrpc.getDestination.useQuery(
            { id: destinationId },
            {
                enabled,
            }
        )
        
    return {refetch, isLoading, isError, data, error }
}