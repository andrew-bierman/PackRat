import { AuthLoader } from 'app/auth/AuthLoader';
import { Redirect } from 'components/Redirect';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <AuthLoader
      loadingElement={<div>Loading...</div>}
      unauthorizedElement={<Redirect to="/sign-in" />}
    >
      {children}
    </AuthLoader>
  );
};
