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
import { userSignUp } from '@packrat/validations';
import { FontAwesome } from '@expo/vector-icons';
import { RIconButton } from '@packrat/ui';

export function SignUpScreen({
  promptAsync,
  signup,
  signUpStatus,
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
          Create an account
        </H1>
        <Form validationSchema={userSignUp}>
          <View flexDirection="column" gap="$3">
            <FormInput label="Name" name="name" />
            <FormInput
              label="Email ID"
              keyboardType="email-address"
              name="email"
            />
            <FormInput label="Username" name="username" />
            <FormInput label="Password" secureTextEntry name="password" />
            <Theme inverse>
              <SubmitButton
                disabled={signUpStatus === 'loading'}
                onSubmit={(data) => signup(data)}
                style={{
                  marginTop: 16,
                  backgroundColor: '#232323',
                  color: 'white',
                }}
                width="100%"
                iconAfter={
                  <AnimatePresence>
                    {signUpStatus === 'loading' && (
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
                Sign Up
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
              {/* <View flexDirection="row" flexWrap="wrap" gap="$3">
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
              </View> */}
            </Theme>
          </View>
        </Form>

        <View style={{ alignItems: 'center', width: '100%' }}>
          <SignInLink />
        </View>
      </View>
    </FormCard>
  );
}

SignUpScreen.fileName = 'SignUpScreen';

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
