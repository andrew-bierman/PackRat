import { View } from 'react-native';
import { RScrollView } from '@packrat/ui';
import useTheme from '../hooks/useTheme';
import { useRegisterUser, useGoogleAuth } from 'app/auth/hooks';
import { SignUpScreen } from '@packrat/ui/src/Bento/forms/layouts';
import { useState } from 'react';

export default function Register() {
  const { currentTheme } = useTheme();
  const { promptAsync, isGoogleSignInReady } = useGoogleAuth();

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

  const { signup, signUpStatus } = useSignup();

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
          <SignUpScreen
            promptAsync={promptAsync}
            signup={signup}
            signUpStatus={signUpStatus}
            isGoogleSignInReady={isGoogleSignInReady}
          />
        </View>
      </View>
    </RScrollView>
  );
}
