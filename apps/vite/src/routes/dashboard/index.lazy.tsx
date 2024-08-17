import React from 'react';
import { DashboardScreen } from 'app/modules/dashboard';

import { AuthWrapper } from 'app/modules/auth';
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
