import React from 'react';
import { DashboardScreen } from 'app/modules/dashboard';
import LandingPage from 'app/components/landing_page';
import { useAuthUser } from 'app/auth/hooks';
import { createFileRoute } from '@tanstack/react-router';
import { ScrollView } from 'react-native';

export const Route = createFileRoute('/')({
  component: Home,
});

export default function Home() {
  const user = useAuthUser();

  return <>{!user ? <LandingPage /> : <DashboardScreen />}</>;
}
