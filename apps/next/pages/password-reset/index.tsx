import { RequestPasswordReset } from 'app/components/password-reset';
import { AuthWrapper } from 'auth/authWrapper';

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
