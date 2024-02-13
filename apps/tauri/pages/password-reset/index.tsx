import { RequestPasswordReset } from 'app/components/password-reset';
import { AuthWrapper } from 'app/auth/AuthWrapper';

// export const runtime = 'experimental-edge'

export default function ResetPasswordRoute() {
  return (
    <>
      <RequestPasswordReset />
    </>
  );
}

ResetPasswordRoute.getLayout = function getLayout(page: any) {
  return <AuthWrapper>{page}</AuthWrapper>;
};
