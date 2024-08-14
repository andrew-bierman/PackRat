import React from 'react';
import { DashboardScreen } from 'app/modules/dashboard';

import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/dashboard/')({
  component: DashboardPage,
});

export default function DashboardPage() {
  return (
    <AuthWrapper>
      <DashboardScreen />
    </AuthWrapper>
  );
}
