import { queryTrpc } from '../../trpc';


export const usePhotonDetail = (osm_id, osm_type) => {
    const isEnabled = Boolean(osm_id && osm_type);
    const { data, error, refetch, isLoading } = queryTrpc.getPhotonDetails.useQuery({ id: osm_id, type: osm_type }, {
        enabled: isEnabled,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    })
    return { refetch, data, error, isLoading }
    
}