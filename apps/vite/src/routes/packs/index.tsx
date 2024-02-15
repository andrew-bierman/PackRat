import React from 'react';
import Feed from 'app/screens/feed/Feed';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/packs/')({
  component: Packs,
});

function Packs() {
  return <Feed feedType="userPacks" />;
}

export default Packs;

Packs.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
