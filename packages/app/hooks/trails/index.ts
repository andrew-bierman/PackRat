import { queryTrpc } from '../../trpc';
// import { trpc } from '../../context/tRPC';
import { setTrails, setFilteredTrails } from '../../store/trailsStore_copy'; // Importing the actions
import { store } from '../../store/store';

function useTrails({ latLng, selectedSearch, radius = 1000 }) {
  // const { data, error, isLoading } = await trpc.getTrailsOSM.query({
  //   lat,
  //   lon,
  //   radius,
  //   selectedSearch,
  // }); //Assumed to be a valid hook from tRPC.
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


  // React.useEffect(() => {
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

    // Dispatching directly using the imported store
    // store.dispatch(setTrails(trails));
    // store.dispatch(setFilteredTrails(filteredTrails));
  }
  // }, [data, dispatch, selectedSearch]);
  return { data, error, isLoading, filteredTrails, trails: data?.features };
}

export default useTrails;
