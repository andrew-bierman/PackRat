import AppearanceContainer from 'app/screens/appearance/AppearanceContainer';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/appearance/')({
  component: Appearance,
});

export default function Appearance() {
  return (
    <AuthWrapper>
      <AppearanceContainer />
    </AuthWrapper>
  );
}
