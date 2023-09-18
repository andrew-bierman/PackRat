import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useSelector } from 'react-redux';
import React from 'react';

const AuthContext = React.createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user) {
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

export function AuthProvider({ children }) {
  const user = useSelector((state) => state.auth.user);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
