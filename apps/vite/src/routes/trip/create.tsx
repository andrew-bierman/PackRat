import CreateTrip from 'app/screens/trip/createTrip';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/trip/create')({
  component: CreateTrip,
});

export default function Trip() {
  return (
    <AuthWrapper>
      <CreateTrip />
    </AuthWrapper>
  );
}
