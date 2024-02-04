import { useFetchSingleTrip } from 'app/hooks/singletrips';
import { createParam } from 'solito';

const { useParam } = createParam();

export function useTripDetails() {
  const [tripId] = useParam('tripId');
  const { data, isLoading, isError } = useFetchSingleTrip(tripId);
  const link = `${CLIENT_URL}/trip/${tripId}`;

  return { data, isLoading, isError, link };
}
