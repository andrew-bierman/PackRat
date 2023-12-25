
import { queryTrpc } from '../../trpc';

const useTrails=({ latLng, selectedSearch, radius = 1000 })=> {
  // const dispatch = useDispatch();
  // const { data, error, isLoading } = await trpc.getTrailsOSM.query({
  //   lat,
  //   lon,
  //   radius,
  //   selectedSearch,
  // }); // Assumed to be a valid hook from tRPC.
  const { lat, lon } = latLng;
  const isEnabled = Boolean(lat && lon);
  // SWAP FOR TRPC react query
  const { data, isLoading, error } = queryTrpc.getTrailsOSM.useQuery(
    {
      lat,
      lon,
      radius,
      selectedSearch,
    },
    {
      enabled: isEnabled,
    },
  );


  let filteredTrails = [];
  if (data) {
    const trails = data.features;
    filteredTrails = trails
      .filter(
        (trail) =>
          trail.properties.name && trail.properties.name !== selectedSearch,
      )
      .map((trail) => trail.properties.name)
      .slice(0, 25);

  }
  return { data, error, isLoading, filteredTrails, trails: data?.features };
}

export default useTrails;
