import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';

import { queryTrpc } from 'app/trpc';
import { useSessionSignIn } from './useSessionSignIn';

const webClientId = String(process.env.NEXT_PUBLIC_GOOGLE_ID);

export const useGoogleAuth = () => {
  const [token, setToken] = useState('');
  const sessionSignIn = useSessionSignIn();

  queryTrpc.googleSignin.useQuery(
    {
      idToken: token,
    },
    { enabled: !!token, onSuccess: (user) => sessionSignIn(user) },
  );

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId,
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
