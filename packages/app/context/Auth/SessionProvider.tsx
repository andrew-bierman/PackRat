import { useRouter } from 'app/hooks/router';

import React, { useEffect } from 'react';
import { useStorageState } from 'app/hooks/storage/useStorageState';

const AuthContext = React.createContext(null);

// // This hook can be used to access the user info. TODO: implement
export function useAuth() {
  return React.useContext(AuthContext);
}

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
