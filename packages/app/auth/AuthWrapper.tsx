import { AuthLoader } from 'app/auth/AuthLoader';
import { Redirect } from 'app/components/Redirect';
import { RText } from '@packrat/ui';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <AuthLoader
      loadingElement={<RText>Loading...</RText>}
      unauthorizedElement={<Redirect to="/sign-in" />}
    >
      {children}
    </AuthLoader>
  );
};
