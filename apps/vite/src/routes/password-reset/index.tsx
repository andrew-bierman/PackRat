import { RequestPasswordReset } from 'app/components/password-reset';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/password-reset/')({
  component: ResetPasswordRoute,
});

export default function ResetPasswordRoute() {
  return (
    <>
      <RequestPasswordReset />
    </>
  );
}
