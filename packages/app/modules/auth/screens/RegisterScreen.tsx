import { View } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRegisterUser, useGoogleAuth } from 'app/modules/auth';
import { SignUpScreen } from '@packrat/ui/src/Bento/forms/layouts';
import { useState } from 'react';

export function RegisterScreen() {
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
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <View
        style={{
          paddingTop: 32,
          paddingBottom: 32,
          height: '100%',
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
  );
}
