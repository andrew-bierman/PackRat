import React from 'react';
import { FeedScreen } from 'app/modules/feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/feed/')({
  component: FeedNav,
});

export default function FeedNav() {
  return (
    <AuthWrapper>
      <FeedScreen />
    </AuthWrapper>
  );
}
