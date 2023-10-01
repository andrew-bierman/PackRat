// import { useDispatch } from 'react-redux';
import { queryTrpc } from '../../trpc';
// import { trpc } from '../../context/tRPC';
import { setTrails, setFilteredTrails } from '../../store/trailsStore_copy'; // Importing the actions
import { store } from '../../store/store';

async function useTrails({ lat, lon, selectedSearch, radius = 1000 }) {
  // const dispatch = useDispatch();
  // const { data, error, isLoading } = await trpc.getTrailsOSM.query({
  //   lat,
  //   lon,
  //   radius,
  //   selectedSearch,
  // }); // Assumed to be a valid hook from tRPC.

  // SWAP FOR TRPC react query
  const { data, isLoading, error } = await queryTrpc.getTrailsOSM.useQuery({
    lat,
    lon,
    radius,
    selectedSearch,
  });

  console.log(data, 'data!!!!!!!');

  // React.useEffect(() => {
  if (data) {
    const trails = data.features;
    const filteredTrails = trails
      .filter(
        (trail) =>
          trail.properties.name && trail.properties.name !== selectedSearch,
      )
      .map((trail) => trail.properties.name)
      .slice(0, 25);

    // Dispatching directly using the imported store
    store.dispatch(setTrails(trails));
    store.dispatch(setFilteredTrails(filteredTrails));
  }
  // }, [data, dispatch, selectedSearch]);

  return { data, error, isLoading };
}

export default useTrails;
