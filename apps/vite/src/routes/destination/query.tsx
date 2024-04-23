import { DestinationPage } from 'app/components/destination';
import { AuthWrapper } from 'app/auth/AuthWrapper';
// import DestinationPage from "../../components/destination";
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/destination/query')({
  component: Destination,
});

export default function Destination() {
  return (
    <AuthWrapper>
      <DestinationPage />
    </AuthWrapper>
  );
}
