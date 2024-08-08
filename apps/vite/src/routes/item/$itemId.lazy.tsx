import React from 'react';
import ItemDetails from 'app/screens/items/item-details';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/item/$itemId')({
  component: ItemsPage,
});

export default function ItemsPage() {
  return (
    <AuthWrapper>
      <ItemDetails />
    </AuthWrapper>
  );
}
