// destinationQueries.js
import { useQuery } from 'react-query';

export function useDestinationData(destinationId, type, id) {
  return useQuery(['destination', destinationId, type, id], async () => {
    const response = await fetch(`/api/destination?id=${destinationId}&type=${type}&osm_id=${id}`);
    return response.json();
  });
}
