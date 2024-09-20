import { queryTrpc } from '../../trpc';

interface Trail {
  properties: Record<string | number, any>;
  id: string;
}

interface TrailDetails {
  id: string;
  name: string;
}

function useTrails({ latLng, selectedSearch, radius = 1000 }) {
  // const { data, error, isLoading } = await trpc.getTrailsOSM.query({
  //   lat,
  //   lon,
  //   radius,
  //   selectedSearch,
  // }); // Assumed to be a valid hook from tRPC.
  const { lat, lon } = latLng || {};
  const isEnabled = Boolean(lat && lon);
  // SWAP FOR TRPC react query
  const { data, isLoading, error } = queryTrpc.getTrailsOSM.useQuery(
    {
      lat,
      lon,
      radius,
      // selectedSearch,
    },
    {
      enabled: isEnabled,
    },
  );

  // React.useEffect(() => {
  let filteredTrails: TrailDetails[] = [];
  if (data) {
    const trails = data.features as Trail[];
    filteredTrails = trails
      .filter(
        (trail) =>
          trail.properties?.name && trail.properties.name !== selectedSearch,
      )
      .map((trail) => ({ id: trail.id, name: trail.properties?.name }))
      .slice(0, 25);

    // Dispatching directly using the imported store
    // store.dispatch(setTrails(trails));
    // store.dispatch(setFilteredTrails(filteredTrails));
  }
  // }, [data, dispatch, selectedSearch]);
  return { data, error, isLoading, filteredTrails, trails: data?.features };
}

export default useTrails;
