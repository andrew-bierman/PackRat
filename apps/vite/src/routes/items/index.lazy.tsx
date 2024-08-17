import React from 'react';
import Items from 'app/screens/items';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/items/')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <Items />
    </AuthWrapper>
  );
}
