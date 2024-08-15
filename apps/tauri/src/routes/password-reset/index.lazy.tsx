import React from 'react';
import { RequestPasswordReset } from 'app/components/password-reset';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/password-reset/')({
  component: ResetPasswordRoute,
});

export default function ResetPasswordRoute() {
  return (
    <>
      <RequestPasswordReset />
    </>
  );
}
