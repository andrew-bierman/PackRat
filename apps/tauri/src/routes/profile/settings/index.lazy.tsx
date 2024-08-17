import React from 'react';
import Settings from 'app/screens/user/Settings';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/settings/')({
  component: SettingsPage,
});

export default function SettingsPage() {
  return (
    <AuthWrapper>
      <Settings />
    </AuthWrapper>
  );
}
