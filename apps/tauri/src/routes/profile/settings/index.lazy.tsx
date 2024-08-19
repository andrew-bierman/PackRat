import React from 'react';
import { SettingsScreen } from 'app/modules/user';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/settings/')({
  component: SettingsPage,
});

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <SettingsScreen />
    </AuthWrapper>
  );
}
