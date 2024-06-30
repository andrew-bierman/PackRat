import React from 'react';
import Dashboard from 'app/screens/dashboard';
import LandingPage from 'app/components/landing_page';
import { createFileRoute } from '@tanstack/react-router';
import { AuthWrapper } from 'app/auth/AuthWrapper';

export const Route = createFileRoute('/')({
  component: Home,
});

export default function Home() {
  return (
    <AuthWrapper unauthorizedElement={<LandingPage />}>
      <Dashboard />
    </AuthWrapper>
  );
}
