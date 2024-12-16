import { useGEOLocationSearch, useOSM } from 'app/hooks/geojson';
import { useTripContext } from 'app/modules/trip/context/tripContext';

export const useTripOSM = () => {
  const osmSearch = useGEOLocationSearch();
  const { tripOSM } = useTripContext();

  return tripOSM || osmSearch;
};
