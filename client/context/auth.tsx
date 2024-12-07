import { useRootNavigationState, useRouter, useSegments } from 'expo-router';

import React, { useEffect } from 'react';
import { useStorageState } from '../hooks/useStorageState';
// import { useSelector } from 'react-redux';
// import React from 'react';

// const AuthContext = React.createContext(null);

// // This hook can be used to access the user info.
// export function useAuth() {
//   return React.useContext(AuthContext);
// }

// // This hook will protect the route access based on user authentication.
export function useProtectedRoute(user) {
  const segments = useSegments();
  const router = useRouter();

  const navigationState = useRootNavigationState();
  React.useEffect(() => {
    if (navigationState?.key) {
      const inAuthGroup = segments[0] === '(auth)';

      if (!user && !inAuthGroup) {
        router.replace('/sign-in');
      } else if (user && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [user, segments, navigationState]);
}

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        sessionSignIn: (session) => {
          setSession(session);
        },
        sessionSignOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
