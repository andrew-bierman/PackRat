// useParks.js
import { queryTrpc } from '../../trpc';
import { store } from '../../store/store';
import { setParks, setParkNames } from '../../store/parksStore';

async function useParks({ lat, lon, selectedSearch, radius = 1000 }) {
  console.log('useParks -------------');
  // const { data, error, isLoading } = await trpc.getParksOSM.query({
  //   lat,
  //   lon,
  //   selectedSearch,
  // })

  const { data, error, isLoading } = await queryTrpc.getParksOSM.query({
    lat,
    lon,
    selectedSearch,
    radius,
  });

  console.log('------------------------------------');
  console.log('data in useParks', data);
  console.log(data);

  if (data) {
    const parks = data.features;
    const filteredParks = parks
      .filter(
        (park) =>
          park.properties.name && park.properties.name !== selectedSearch,
      )
      .map((park) => park.properties.name)
      .slice(0, 25);

    store.dispatch(setParks(parks));
    store.dispatch(setParkNames(filteredParks));
  }

  return { data, error, isLoading };
}

export default useParks;
