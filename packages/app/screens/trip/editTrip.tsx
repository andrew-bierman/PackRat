import React, { useState } from 'react';
import { TripProvider } from 'app/modules/trip/context/tripContext';
import { TripScreen } from './TripScreen';
import { useCreateTripStore } from './createTripStore';
import { AsyncView } from 'app/components/AsyncView';
import { useFetchSingleTrip } from 'app/hooks/singletrips';
import { type addTripKey } from './createTripStore/store';
import { useOSM } from 'app/hooks/geojson';
import { useTripId } from 'app/hooks/trips';

export default function EditTripScreen() {
  const [tripId] = useTripId();
  const { isLoading, isError, data } = useFetchSingleTrip(tripId);

  return (
    <AsyncView isLoading={isLoading || !data} isError={isError}>
      <TripLoader
        initialState={{
          name: data?.name,
          description: data?.description,
          destination: data?.destination,
          activity: data?.activity,
          start_date: new Date(data?.start_date),
          end_date: new Date(data?.end_date),
          geoJSON: data?.geoJSON,
        }}
        packId={data?.pack_id}
        tripId={tripId}
        bounds={data?.bounds}
        ownerId={data?.owner_id}
      />
    </AsyncView>
  );
}

const TripLoader = ({
  initialState,
  packId,
  tripId,
  bounds,
  ownerId,
}: {
  initialState: Partial<Record<addTripKey, any>>;
  packId: string;
  tripId: string;
  ownerId: string;
  bounds: any;
}) => {
  const tripStore = useCreateTripStore(initialState);
  const tripPack = useState(packId);
  const tripOSM = useOSM();

  return (
    <TripProvider value={{ tripStore, tripPack, tripOSM }}>
      <TripScreen
        tripId={tripId}
        initialBounds={bounds}
        initialState={initialState}
        initialPlaceName={initialState.destination}
        ownerId={ownerId}
      />
    </TripProvider>
  );
};
