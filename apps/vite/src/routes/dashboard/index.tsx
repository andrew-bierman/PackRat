import Dashboard from 'app/screens/dashboard';

import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
});

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <Dashboard />
    </AuthWrapper>
  );
}
