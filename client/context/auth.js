// @ts-nocheck
// @ts-ignore

// import { useSelector, useDispatch } from 'react-redux';

// Define the shape of the context
// const AuthContext = React.createContext({
//   user: null,
//   signIn: () => {},
//   signOut: () => {}
// });

// export function useAuth() {
//   return React.useContext(AuthContext);
// }

// function useProtectedRoute(user) {
//   const segments = useSegments();
//   const router = useRouter();

//   React.useEffect(() => {
//     const inAuthGroup = segments[0] === '(auth)';
//     // need to add check for approved pages as well

//     if (!user && !inAuthGroup) {
//       router.replace('/sign-in');
//     } else if (user && inAuthGroup) {
//       router.replace('/');
//     }
//   }, [user, segments]);
// }

// export function AuthProvider({ children }) {
//   const user = useSelector((state) => state.auth.user);
//   const dispatch = useDispatch();

//   // These methods will dispatch your Redux actions
//   const signIn = (credentials) => {
//     dispatch(/* your sign-in action with credentials */);
//   };

//   const signOut = () => {
//     dispatch(/* your sign-out action */);
//   };

//   useProtectedRoute(user);

//   return (
//     <AuthContext.Provider value={{ user, signIn, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// NEW CODE - Docs
// import React from 'react';
// import { useStorageState } from './useStorageState';

// const AuthContext = React.createContext<{ signIn: () => void; signOut: () => void; session?: string | null, isLoading: boolean } | null>(null);

// // This hook can be used to access the user info.
// export function useSession() {
//   const value = React.useContext(AuthContext);
//   if (process.env.NODE_ENV !== 'production') {
//     if (!value) {
//       throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }
//   }

//   return value;
// }

// export function SessionProvider(props) {
//   const [[isLoading, session], setSession] = useStorageState('session');

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: () => {
//           // Perform sign-in logic here
//           setSession('session');
//         },
//         signOut: () => {
//           setSession(null);
//         },
//         session,
//         isLoading,
//       }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signIn, signOut, resetState } from '../store/authStore';
import { useStorageState } from '../hooks/useStorageState';

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
  const user = useSelector((state) => state.auth.user);
  const [[isLoading, session], setSession] = useStorageState('session');
  // const isLoading = useSelector(state => state.auth.isLoading); // Assuming you have an isLoading field in your Redux state
  const dispatch = useDispatch();

  const signIn = async (credentials) => {
    dispatch(signIn(credentials));
    setSession('session');
  };

  const signOut = async () => {
    // setSession(null);
    // await dispatch(signOut());
    dispatch(resetState()); // TEMPORARY FIX
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: user, // Use the user from Redux as the session
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
