// useParks.js
import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { setParks, setParkNames } from '../../store/parksStore';

function useParks({ latLng, radius = 5000 }) {
  // const { data, error, isLoading } = await trpc.getParksOSM.query({
  //   lat,
  //   lon,
  //   selectedSearch,
  // })
  const { lat, lon } = latLng;
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
    const parks = data.features;
    const filteredParks = parks
      .filter(
        (park) => park.properties.name,
        // && park.properties.name !== selectedSearch,
      )
      .map((park) => park.properties.name)
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
