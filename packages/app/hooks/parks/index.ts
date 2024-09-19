// useParks.js
import { queryTrpc } from '../../trpc';

interface Park {
  id: string;
  properties: Record<string | number, any>;
}

interface ParkDetails {
  id: string;
  name: string;
}

function useParks({ latLng, radius = 5000 }) {
  // const { data, error, isLoading } = await trpc.getParksOSM.query({
  //   lat,
  //   lon,
  //   selectedSearch,
  // })
  const { lat, lon } = latLng || {};
  const isEnabled = Boolean(lat && lon);
  const { data, error, isLoading } = queryTrpc.getParksOSM.useQuery(
    {
      lat,
      lon,
      radius,
    },
    {
      enabled: isEnabled,
      refetchOnWindowFocus: false,
    },
  );

  if (data) {
    const parks = data.features as Park[];
    const filteredParks = parks
      .filter(
        (park) => park.properties && park.properties?.name,
        // && park.properties.name !== selectedSearch,
      )
      .map((park) => ({ id: park.id, name: park.properties?.name }))
      .filter(Boolean)
      .slice(0, 25);

    // store.dispatch(setParks(parks));
    // store.dispatch(setParkNames(filteredParks));
    return { data, error, isLoading, parks, filteredParks };
  }
  return {
    isLoading,
    data,
    error,
  };
}

export default useParks;
