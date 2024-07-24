import React from 'react';
import { AuthLoader } from 'app/auth/AuthLoader';
import { Redirect } from 'app/components/Redirect';
import { RSpinner, RText } from '@packrat/ui';
import { Platform, View } from 'react-native';
import LandingPage from 'app/components/landing_page';

interface AuthWrapperProps {
  children?: React.ReactNode;
  unauthorizedElement?: React.ReactNode;
}

export const AuthWrapper = ({
  children,
  unauthorizedElement,
}: AuthWrapperProps) => {
  const loadingElement =
    Platform.OS === 'web' ? (
      <RText>Loading...</RText>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RSpinner color="#0284c7" />
      </View>
    );

  const defaultUnauthorizedElement =
    Platform.OS === 'web' ? <Redirect to="/sign-in" /> : <LandingPage />;

  return (
    <AuthLoader
      loadingElement={loadingElement}
      unauthorizedElement={unauthorizedElement || defaultUnauthorizedElement}
    >
      {children}
    </AuthLoader>
  );
};
