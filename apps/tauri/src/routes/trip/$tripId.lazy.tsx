import React from 'react';
import { TripDetails } from 'app/screens/trip/TripDetails';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/trip/$tripId')({
  component: Trip,
});

export default function Trip() {
  return (
    <AuthWrapper>
      <TripDetails />
    </AuthWrapper>
  );
}
