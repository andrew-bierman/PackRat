import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';

import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';

const webClientId = import.meta.env.VITE_PUBLIC_GOOGLE_ID as string;
const iosClientId = String(process.env.IOS_CLIENT_ID);
const androidClientId = String(process.env.ANDROID_CLIENT_ID);

console.log('webClientId', androidClientId)

export const useGoogleAuth = () => {
  const [token, setToken] = useState('');
  const sessionSignIn = useSessionSignIn();

  queryTrpc.googleSignin.useQuery(
    {
      idToken: token,
    },
    {
      enabled: !!token,
      onSuccess: (user) => {
        sessionSignIn(user);
      },
    },
  );

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId,
    iosClientId,
    androidClientId,
  });

  const enableGoogleLogin = webClientId && webClientId !== '';

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      setToken(id_token);
    }
  }, [response]);

  return { enableGoogleLogin, isGoogleSignInReady: !!request, promptAsync };
};
