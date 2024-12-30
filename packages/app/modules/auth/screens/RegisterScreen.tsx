import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import useTheme from 'app/hooks/useTheme';
import { useRegisterUser, useGoogleAuth } from 'app/modules/auth';
import { SignUpScreen } from '@packrat/ui/src/Bento/forms/layouts';

function useSignup() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
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

export function RegisterScreen() {
  const { currentTheme } = useTheme();
  const { promptAsync, isGoogleSignInReady } = useGoogleAuth();
  const { signup, signUpStatus } = useSignup();

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: currentTheme.colors.background,
      }}
    >
      <ScrollView>
        <View
          style={{
            paddingTop: 32,
            paddingBottom: 32,
            alignItems: 'center',
            alignSelf: 'center',
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
      </ScrollView>
    </View>
  );
}
