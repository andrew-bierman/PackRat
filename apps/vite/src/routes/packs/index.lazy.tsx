import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/packs/')({
  component: Packs,
});

function Packs() {
  return (
    <AuthWrapper>
      <FeedScreen feedType="userPacks" />
    </AuthWrapper>
  );
}

export default Packs;
