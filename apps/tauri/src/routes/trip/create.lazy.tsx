import React from 'react';
import CreateTrip from 'app/screens/trip/createTrip';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/trip/create')({
  component: CreateTrip,
});

export default function Trip() {
  return (
    <AuthWrapper>
      <CreateTrip />
    </AuthWrapper>
  );
}
