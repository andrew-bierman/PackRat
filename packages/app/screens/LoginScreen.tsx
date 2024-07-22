import React, { useState } from 'react';
import { View } from 'react-native';
import { RStack, RScrollView } from '@packrat/ui';
import useTheme from '../hooks/useTheme';
import { useGoogleAuth, useLogin } from 'app/auth/hooks';
import { SignInScreen } from '@packrat/ui/src/Bento/forms/layouts';

const demoUser = {
  email: 'zoot3@email.com',
  password: '12345678',
};

export default function Login() {
  const { enableGoogleLogin, isGoogleSignInReady, promptAsync } =
    useGoogleAuth();

  function useSignIn() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>(
      'idle',
    );
    const { handleLogin } = useLogin();
    return {
      signInStatus: status,
      signIn: async (data) => {
        await setStatus('loading');
        await handleLogin(data);
        setStatus('idle');
      },
    };
  }

  const { signIn, signInStatus } = useSignIn();
  const { currentTheme } = useTheme();

  return (
    <RScrollView>
      <RStack>
        <RStack
          style={{
            width: '100%',
            alignItems: 'center',
            backgroundColor:
              currentTheme.colors.background === '#0284c7'
                ? 'white'
                : currentTheme.colors.background,
          }}
        >
          <View
            style={{
              paddingTop: 32,
              paddingBottom: 32,
              width: '90%',
              maxWidth: 400,
            }}
          >
            <SignInScreen
              promptAsync={promptAsync}
              signIn={signIn}
              signInStatus={signInStatus}
              isGoogleSignInReady={isGoogleSignInReady}
            />
          </View>
        </RStack>
      </RStack>
    </RScrollView>
  );
}
