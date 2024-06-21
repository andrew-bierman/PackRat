// import { Facebook, Github } from '@tamagui/lucide-icons';
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
import { FormCard } from './components/layoutParts';
import { RLink } from '@packrat/ui';
import { Form, FormInput, SubmitButton } from '@packrat/ui';
import { userSignIn } from '@packrat/validations';
import { FontAwesome } from '@expo/vector-icons';
import { RIconButton } from '@packrat/ui';

export function SignInScreen({
  promptAsync,
  signIn,
  signInStatus,
  isGoogleSignInReady,
}) {
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
          Sign in to your account
        </H1>
        <Form validationSchema={userSignIn}>
          <View flexDirection="column" gap="$3">
            <FormInput
              label="Email ID"
              keyboardType="email-address"
              name="email"
            />
            <FormInput label="Password" secureTextEntry name="password" />
            <Theme inverse>
              <SubmitButton
                disabled={signInStatus === 'loading'}
                onSubmit={(data) => signIn(data)}
                style={{
                  marginTop: 16,
                  backgroundColor: '#232323',
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
                Sign In
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
              <View flexDirection="row" flexWrap="wrap" gap="$3">
                <RIconButton
                  disabled={!isGoogleSignInReady}
                  flex={1}
                  onPress={async (event) => {
                    event.preventDefault();
                    await promptAsync();
                  }}
                  icon={<FontAwesome name="google" size={16} />}
                >
                  Continue with Google
                </RIconButton>
              </View>
              <ForgotPasswordLink />
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
