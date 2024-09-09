import React, { useEffect, useState } from 'react';
import { AuthLoader } from './AuthLoader';
import { Redirect } from 'app/components/Redirect';
import { RSpinner, RText, RButton } from '@packrat/ui';
import { Platform, View, Alert } from 'react-native';
import LandingPage from 'app/components/landing_page';
import * as LocalAuthentication from 'expo-local-authentication';
import useTheme from 'app/hooks/useTheme';

interface AuthWrapperProps {
  children?: React.ReactNode;
  unauthorizedElement?: React.ReactNode;
}

export const AuthWrapper = ({
  children,
  unauthorizedElement,
}: AuthWrapperProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { currentTheme } = useTheme();

  const authenticate = async () => {
    if (Platform.OS === 'web') {
      setIsAuthenticated(true);
      return;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        'Error',
        'Your device does not support biometric authentication.',
      );
      return;
    }

    const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!hasBiometrics) {
      Alert.alert(
        'Error',
        'No biometrics are enrolled. Please set up biometrics in your device settings.',
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  if (!isAuthenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: currentTheme.colors.background,
        }}
      >
        <RText style={{ color: currentTheme.colors.text }}>
          Please unlock to continue
        </RText>
        <RButton onPress={authenticate}>Unlock</RButton>
      </View>
    );
  }

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
