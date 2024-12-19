import React from 'react';
import EditTripScreen from 'app/screens/trip/editTrip';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/trip/$tripId')({
  component: Trip,
});

export default function Trip() {
  return (
    <AuthWrapper>
      <EditTripScreen />
    </AuthWrapper>
  );
}
