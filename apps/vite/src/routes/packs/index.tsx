import React from 'react';
import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/packs/')({
  component: Packs,
});

function Packs() {
  return (
    <AuthWrapper>
      <Feed feedType="userPacks" />
    </AuthWrapper>
  );
}

export default Packs;
