import { AuthLoader } from 'app/auth/AuthLoader';
import { Redirect } from 'app/components/Redirect';
import {Text} from '@packrat/ui';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <AuthLoader
      loadingElement={<Text>Loading...</Text>}
      unauthorizedElement={<Redirect to="/sign-in" />}
    >
      {children}
    </AuthLoader>
  );
};
