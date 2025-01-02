import React, { useState } from 'react';
import { TripProvider } from 'app/modules/trip/context/tripContext';
import { TripScreen } from './TripScreen';
import { useCreateTripStore } from './createTripStore';
import { AsyncView } from 'app/components/AsyncView';
import { useFetchSingleTrip } from 'app/hooks/singletrips';
import { type addTripKey } from './createTripStore/store';
import { useOSM } from 'app/hooks/geojson';
import { useTripId } from 'app/hooks/trips';
import { formatTripDate } from 'app/modules/trip/utils';

// Add the TripData type definition
interface TripData {
  name?: string;
  description?: string;
  destination?: string;
  activity?: string;
  is_public?: boolean;
  start_date?: string;
  end_date?: string;
  geoJSON?: any;
  pack_id?: string;
  bounds?: any;
  owner_id?: string;
}

export default function EditTripScreen() {
  const [tripId] = useTripId();
  const { isLoading, isError, data } = useFetchSingleTrip(tripId);
  const tripData = data as TripData; // Ensure data is typed correctly
  return (
    <AsyncView isLoading={isLoading || !tripData} isError={isError}>
      <TripLoader
        initialState={{
          name: tripData?.name,
          description: tripData?.description,
          destination: tripData?.destination,
          activity: tripData?.activity,
          is_public: tripData?.is_public,
          start_date: formatTripDate(tripData?.start_date || '').toDate(),
          end_date: formatTripDate(tripData?.end_date || '').toDate(),
          geoJSON: tripData?.geoJSON,
        }}
        packId={tripData?.pack_id || ''}
        tripId={tripId}
        bounds={tripData?.bounds}
        ownerId={tripData?.owner_id || ''} // Ensure ownerId is a string
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
