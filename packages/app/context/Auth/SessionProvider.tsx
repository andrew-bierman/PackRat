import React, from 'react';
import { useStorageState } from 'app/hooks/storage/useStorageState';

type SessionContextType = {
  sessionSignIn: (session: any) => void;
  sessionSignOut: () => void;
  session: string | null;
  isLoading: boolean;
} | null;

const AuthContext = React.createContext<SessionContextType>(null);

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
