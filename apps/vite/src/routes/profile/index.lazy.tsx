import React from 'react';
import ProfileContainer from 'app/screens/user/ProfileContainer';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/')({
  component: Profile,
});

export default function Profile() {
  return (
    <AuthWrapper>
      <ProfileContainer />
    </AuthWrapper>
  );
}
