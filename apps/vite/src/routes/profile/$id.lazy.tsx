import React from 'react';
import { ProfileScreen, useProfileId } from 'app/modules/user';

import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/profile/$id')({
  component: Profile,
});

export default function Profile() {
  const [id] = useProfileId();

  return (
    <>
      <ProfileScreen userId={id} />
    </>
  );
}
