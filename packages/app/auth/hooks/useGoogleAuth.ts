import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';

import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';
import {
  WEB_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from '@packrat/config';

const webClientId = String(WEB_CLIENT_ID);
const iosClientId = String(IOS_CLIENT_ID);
const androidClientId = String(ANDROID_CLIENT_ID);

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
