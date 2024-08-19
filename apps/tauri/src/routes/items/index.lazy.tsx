import React from 'react';
import { ItemsScreen } from 'app/modules/item';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <ItemsScreen />
    </AuthWrapper>
  );
}
