import React, { useState } from 'react';
import useTheme from '../../../hooks/useTheme';
import { useGoogleAuth, useLogin } from 'app/modules/auth';
import { SignInScreen } from '@packrat/ui/src/Bento/forms/layouts';
import { RScrollView } from '@packrat/ui';
import { View } from 'tamagui';

const demoUser = {
  email: 'zoot3@email.com',
  password: '12345678',
};

export function LoginScreen() {
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
    <RScrollView contentContainerStyle={{ paddingBottom: 20 } as any}>
      <View
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
      </View>
    </RScrollView>
  );
}
