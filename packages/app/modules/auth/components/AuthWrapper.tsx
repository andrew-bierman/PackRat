import React from 'react';
import { AuthLoader } from './AuthLoader';
import { Redirect } from 'app/components/Redirect';
import { Redirect as ExpoRedirect } from 'expo-router';
import { RSpinner, RText } from '@packrat/ui';
import { Platform, View } from 'react-native';
import useTheme from 'app/hooks/useTheme';

interface AuthWrapperProps {
  children?: React.ReactNode;
  unauthorizedElement?: React.ReactNode;
}

export const AuthWrapper = ({
  children,
  unauthorizedElement,
}: AuthWrapperProps) => {
  const { currentTheme } = useTheme();

  const loadingElement =
    Platform.OS === 'web' ? (
      <RText>Loading...</RText>
    ) : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RSpinner color="#0284c7" />
      </View>
    );

  const defaultUnauthorizedElement =
    Platform.OS === 'web' ? (
      <Redirect to="/sign-in" />
    ) : (
      <ExpoRedirect href="entry" />
    );

  return (
    <AuthLoader
      loadingElement={loadingElement}
      unauthorizedElement={unauthorizedElement || defaultUnauthorizedElement}
    >
      {children}
    </AuthLoader>
  );
};
