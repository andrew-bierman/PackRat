import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Google from 'expo-auth-session/providers/google';
import { useSession } from '../../context/Auth/SessionProvider';
import { WEB_CLIENT_ID } from '@env';
import { signInWithGoogle } from '../../store/authStore';

export const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const { sessionSignIn } = useSession();
  // Add Google auth-related variables
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID || 'default',
  });

  const enableGoogleLogin = WEB_CLIENT_ID && WEB_CLIENT_ID !== '';

  useEffect(() => {
    console.log({ response });
    if (response?.type === 'success') {
      const { id_token } = response.params;
      dispatch(signInWithGoogle({ idToken: id_token })).then(({ payload }) => {
        if (!payload) return;
        if (payload.token) {
          sessionSignIn(payload.token);
        }
      });
    }
  }, [response]);

  return { enableGoogleLogin, isGoogleSignInReady: !!request, promptAsync };
};
