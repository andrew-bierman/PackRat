import React from 'react';
import { ProfileScreen } from 'app/modules/user';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

export default function Profile() {
  return (
    <AuthWrapper>
      <ProfileScreen />
    </AuthWrapper>
  );
}
