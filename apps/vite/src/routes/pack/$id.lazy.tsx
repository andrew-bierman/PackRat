import React from 'react';
import { PackDetailsScreen } from 'app/modules/pack';
import { AuthWrapper } from 'app/modules/auth';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/pack/$id')({
  component: PackScreen,
});

function PackScreen() {
  return (
    <AuthWrapper>
      <PackDetailsScreen />
    </AuthWrapper>
  );
}

export default PackScreen;
