import React from 'react';
import { PackDetails } from 'app/components/pack/PackDetails';
import { AuthWrapper } from 'app/auth/AuthWrapper';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/pack/$id')({
  component: PackScreen,
});

function PackScreen() {
  return (
    <AuthWrapper>
      <PackDetails />
    </AuthWrapper>
  );
}

export default PackScreen;
