import { TripDetails } from 'app/screens/trip/TripDetails';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/trip/$tripId')({
  component: Trip,
});

export default function Trip() {
  return (
    <AuthWrapper>
      <TripDetails />
    </AuthWrapper>
  );
}
