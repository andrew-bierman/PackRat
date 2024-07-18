import React from 'react';
import Dashboard from 'app/screens/dashboard';
import LandingPage from 'app/components/landing_page';
import { useAuthUser } from 'app/auth/hooks';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

export default function Home() {
  const user = useAuthUser();

  return <>{!user ? <LandingPage /> : <Dashboard />}</>;
}
