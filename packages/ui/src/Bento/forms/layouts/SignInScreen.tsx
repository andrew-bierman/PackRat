import { Facebook, Github } from '@tamagui/lucide-icons';
import { useState } from 'react';
import {
  AnimatePresence,
  Button,
  H1,
  Paragraph,
  Separator,
  SizableText,
  Spinner,
  Theme,
  View,
} from 'tamagui';
import { Input } from '../inputs/components/inputsParts';
import { FormCard } from './components/layoutParts';
import { RLink } from '@packrat/ui';
import { Form, FormInput, SubmitButton } from '@packrat/ui';
import { userSignUp } from '@packrat/validations';
import { useRegisterUser, useGoogleAuth } from 'app/auth/hooks';
import { FontAwesome } from '@expo/vector-icons';

type mode = 'signup' | 'signin';

/** simulate signin */
function useSignIn() {
  const [loginStatus, setStatus] = useState<'idle' | 'loading' | 'success'>(
    'idle',
  );
  return {
    status: status,
    signIn: () => {
      setStatus('loading');
      setTimeout(() => {
        setStatus('success');
      }, 2000);
    },
  };
}

function useSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const { registerUser } = useRegisterUser();
  return {
    signupStatus: status,
    signup: () => {
      setStatus('loading')
      registerUser();
      setStatus('success')
    }
  };
}

/** ------ EXAMPLE ------ */
export function SignInScreen({ mode }: mode) {
  const { signIn, loginStatus } = useSignIn();
  const { signup, signupStatus } = useSignup();

  return (
    <FormCard>
      <View
        flexDirection="column"
        alignItems="stretch"
        minWidth="100%"
        maxWidth="100%"
        gap="$4"
        padding="$4"
        paddingVertical="$6"
        $group-window-gtSm={{
          paddingVertical: '$4',
          width: 400,
        }}
      >
        <H1 alignSelf="center" size="$8" $group-window-xs={{ size: '$7' }}>
          {mode === 'signup'
            ? 'Sign up to your account'
            : 'Sign in to your account'}
        </H1>
        <Form validationSchema={userSignUp}>
          <View flexDirection="column" gap="$3">
            {mode === 'signup' && <FormInput label="Name" name="name" />}
            <FormInput
              label="Email ID"
              keyboardType="email-address"
              name="email"
            />
            {mode === 'signup' && (
              <FormInput label="Username" name="username" />
            )}
            <FormInput label="Password" secureTextEntry name="password" />
            <Theme inverse>
              <Button
                disabled={mode === 'signup' ? (signupStatus === 'loading') : (loginStatus === 'loading')}
                onSubmit={ mode === 'signup' ? signup : signIn}
                width="100%"
                iconAfter={
                  <AnimatePresence>
                    {loginStatus === 'loading' || signupStatus === 'loading' && (
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
                <Button.Text>{mode === 'signup' ? 'Sign up' : 'Sign In'}</Button.Text>
              </Button>
            </Theme>
          </View>
        </Form>
        <View flexDirection="column" gap="$3" width="100%" alignItems="center">
          <Theme>
            <View flexDirection="row" width="100%" alignItems="center" gap="$4">
              <Separator />
              <Paragraph>Or</Paragraph>
              <Separator />
            </View>
            <View flexDirection="row" flexWrap="wrap" gap="$3">
              <Button flex={1} onPress={async () => await promptAsync()}>
                <Button.Icon>
                  <FontAwesome name="google" size={16} />
                </Button.Icon>
                <Button.Text>Continue with Google</Button.Text>
              </Button>
            </View>
          </Theme>
        </View>
        {mode === 'signin' ? <SignUpLink /> : <SignInLink />}
      </View>
    </FormCard>
  );
}

SignInScreen.fileName = 'SignInScreen';

// Swap for your own Link
const Link = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <View href={href} tag="a">
      {children}
    </View>
  );
};

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

const SignInLink = () => {
  return (
    <RLink href={`/sign-in`}>
      <Paragraph textDecorationStyle="unset" ta="center">
        Already have an account?{' '}
        <SizableText
          hoverStyle={{
            color: '$colorHover',
          }}
          textDecorationLine="underline"
        >
          Sign in
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
