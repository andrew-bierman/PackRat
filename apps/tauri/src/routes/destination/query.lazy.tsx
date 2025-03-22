import { DestinationScreen } from 'app/modules/map/screens/DestinationScreen';
import { AuthWrapper } from 'app/modules/auth';
// import DestinationPage from "../../components/destination";
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/destination/query')({
  component: Destination,
});

export default function Destination() {
  return (
    <AuthWrapper>
      <DestinationScreen />
    </AuthWrapper>
  );
}
