import Settings from 'app/screens/user/Settings';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/settings/')({
  component: SettingsPage,
});

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <Settings />
    </AuthWrapper>
  );
}
