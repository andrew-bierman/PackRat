import { AuthLoader } from 'app/auth/AuthLoader';
import { Redirect } from 'app/components/Redirect';
import { RSpinner, RText } from '@packrat/ui';
import { Platform, View } from 'react-native';
import LandingPage from 'app/components/landing_page';

type Props = {
  children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <AuthLoader
      loadingElement={
        Platform.OS === 'web' ? (
          <RText>Loading...</RText>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <RSpinner color="#0284c7" />
          </View>
        )
      }
      unauthorizedElement={<LandingPage />}
    >
      {children}
    </AuthLoader>
  );
};
