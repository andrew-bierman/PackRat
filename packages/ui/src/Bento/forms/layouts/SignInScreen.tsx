// import { Facebook, Github } from '@tamagui/lucide-icons';
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
import { FormCard } from './components/layoutParts';
import { RLink } from '@packrat/ui';
import { Form, FormInput, SubmitButton } from '@packrat/ui';
import { userSignUp } from '@packrat/validations';
import { userSignIn } from '@packrat/validations';
import { useRegisterUser, useGoogleAuth, useLogin } from 'app/auth/hooks';
import { FontAwesome } from '@expo/vector-icons';
import {RIconButton} from '@packrat/ui';
import useTheme from 'app/hooks/useTheme';


type mode = 'signup' | 'signin';

/** simulate signin */

/** ------ EXAMPLE ------ */
export function SignInScreen({ mode }: mode) {
  function useSignIn() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>(
      'idle',
    );
    const { handleLogin } = useLogin();
    return {
      signInStatus: status,
      signIn: async (data) => {
        await setStatus('loading');
        console.log(status);
        await handleLogin(data);
        setStatus('idle');
      },
    };
  }

  function useSignup() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>(
      'idle',
    );
    const { registerUser } = useRegisterUser();
    return {
      signUpStatus: status,
      signup: async (data) => {
        setStatus('loading');
        await registerUser(data);
        setStatus('idle');
      },
    };
  }
  const { signIn, signInStatus } = useSignIn();
  const { signup, signUpStatus } = useSignup();
  const { promptAsync } = useGoogleAuth();
  const { currentTheme } = useTheme();


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
        <H1
          alignSelf="center"
          size="$8"
          $group-window-xs={{
            size: '$7',
          }}
        >
          Sign in to your account
        </H1>
        <Form validationSchema={mode === 'signup' ? userSignUp : userSignIn}>
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
              <SubmitButton
                disabled={
                  mode === 'signup'
                    ? signInStatus === 'loading'
                    : signUpStatus === 'loading'
                }
                onSubmit={(data) =>
                  mode === 'signup' ? signup(data) : signIn(data)
                }
                style={{
                  marginTop: 16,
                  backgroundColor: '#232323',
                  color: 'white',
                }}
                width="100%"
                iconAfter={
                  <AnimatePresence>
                    {signUpStatus === 'loading' ||
                      (signInStatus === 'loading' && (
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
                      ))}
                  </AnimatePresence>
                }
              >
                {mode === 'signup' ? 'Sign Up' : 'Sign In'}
              </SubmitButton>
            </Theme>
          </View>
          <View flexDirection="column" gap="$3" width="100%" alignItems="center">
          <Theme>
            <View flexDirection="row" width="100%" alignItems="center" gap="$4">
              <Separator />
              <Paragraph>Or</Paragraph>
              <Separator />
            </View>
            <View flexDirection="row" flexWrap="wrap" gap="$3">
            <RIconButton
                flex={1}
                onPress={async () => await promptAsync()}
                icon={
                  <FontAwesome
                    name="google"
                    size={16}
                  />
                }
              >
                Continue with Google
              </RIconButton>
            </View>
          </Theme>
        </View>
        </Form>
        
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
    <Link href={`#`}>
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
    </Link>
  );
};

const ForgotPasswordLink = () => {
  return (
    <Link href={`#`}>
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
    </Link>
  );
};
