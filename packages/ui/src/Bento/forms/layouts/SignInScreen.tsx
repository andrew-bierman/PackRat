import * as LocalAuthentication from 'expo-local-authentication';
import {
  AnimatePresence,
  H1,
  Paragraph,
  Separator,
  SizableText,
  Spinner,
  Theme,
  View,
} from 'tamagui';
import { Text, Platform, Alert } from 'react-native';
import { FormCard } from './components/layoutParts';
import { RLink } from '@packrat/ui';
import { Form, FormInput, SubmitButton } from '@packrat/ui';
import { userSignIn } from '@packrat/validations';
import useTheme from 'app/hooks/useTheme';
import useResponsive from 'app/hooks/useResponsive';

export function SignInScreen({
  promptAsync,
  signIn,
  signInStatus,
  isGoogleSignInReady,
}) {
  const { currentTheme } = useTheme();
  const { xxs, xs } = useResponsive();

  const handleBiometricAuth = async () => {
    if (Platform.OS === 'web') {
      return true;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert(
        'Error',
        'Your device does not support biometric authentication.',
      );
      return false;
    }

    const hasBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!hasBiometrics) {
      Alert.alert(
        'Error',
        'No biometrics are enrolled. Please set up biometrics in your device settings.',
      );
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to continue',
      fallbackLabel: 'Use Passcode',
    });

    if (!result.success) {
      Alert.alert('Authentication failed', 'Please try again.');
    }

    return result.success;
  };

  const handleSubmit = async (data) => {
    const isBiometricallyAuthenticated = await handleBiometricAuth();
    if (isBiometricallyAuthenticated) {
      signIn(data);
    }
  };

  return (
    <FormCard>
      <View
        flexDirection="column"
        alignItems="stretch"
        minWidth="100%"
        maxWidth="100%"
        gap="$4"
        padding="$4"
        paddingVertical="$14"
        $group-window-gtSm={{
          paddingVertical: '$4',
          width: 400,
        }}
      >
        <H1
          alignSelf="center"
          size="$8"
          $group-window-xs={{ size: '$7' }}
          color={currentTheme.colors.tertiaryBlue}
        >
          Sign in to your account
        </H1>
        <Form validationSchema={userSignIn}>
          <View flexDirection="column" gap="$3">
            <FormInput
              label="Email ID"
              keyboardType="email-address"
              name="email"
              aria-label="Email"
            />
            <FormInput
              label="Password"
              secureTextEntry
              name="password"
              aria-label="Password"
            />
            <Theme inverse>
              <SubmitButton
                disabled={signInStatus === 'loading'}
                onSubmit={handleSubmit}
                style={{
                  marginTop: 16,
                  backgroundColor: currentTheme.colors.tertiaryBlue,
                  color: 'white',
                }}
                width="100%"
                iconAfter={
                  <AnimatePresence>
                    {signInStatus === 'loading' && (
                      <Spinner
                        color="$color"
                        key="loading-spinner"
                        opacity={1}
                        scale={1}
                        animation="quick"
                        position="absolute"
                        left="60%"
                        enterStyle={{
                          opacity: 0,
                          scale: 0.5,
                        }}
                        exitStyle={{
                          opacity: 0,
                          scale: 0.5,
                        }}
                      />
                    )}
                  </AnimatePresence>
                }
              >
                <Text style={{ color: currentTheme.colors.white }}>
                  Sign In
                </Text>
              </SubmitButton>
            </Theme>
          </View>
          <View
            flexDirection="column"
            gap="$3"
            width="100%"
            alignItems="center"
          >
            <Theme>
              <View
                flexDirection="row"
                width="100%"
                alignItems="center"
                gap="$4"
              >
                <Separator />
                <Paragraph>Or</Paragraph>
                <Separator />
              </View>
            </Theme>
          </View>
        </Form>

        <View style={{ alignItems: 'center', width: '100%' }}>
          <SignUpLink />
        </View>
      </View>
    </FormCard>
  );
}

SignInScreen.fileName = 'SignInScreen';

const SignUpLink = () => {
  return (
    <RLink href={`/register`}>
      <Paragraph textDecorationStyle="unset" ta="center">
        Don&apos;t have an account?{' '}
        <SizableText
          hoverStyle={{
            color: '$colorHover',
          }}
          textDecorationLine="underline"
        >
          Sign up
        </SizableText>
      </Paragraph>
    </RLink>
  );
};

const ForgotPasswordLink = () => {
  return (
    <RLink href={`/password-reset`}>
      <Paragraph
        color="$gray11"
        hoverStyle={{
          color: '$gray12',
        }}
        size="$1"
        marginTop="$1"
      >
        Forgot your password?
      </Paragraph>
    </RLink>
  );
};
