import React from 'react';
import { TripProvider } from 'app/modules/trip/context/tripContext';
import { TripScreen } from './TripScreen';
import { useCreateTripStore } from './createTripStore';

export default function CreateTrip() {
  const tripStore = useCreateTripStore();
  return (
    <TripProvider value={{ tripStore }}>
      <TripScreen />
    </TripProvider>
  );
}
