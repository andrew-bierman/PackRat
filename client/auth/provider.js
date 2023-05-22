// import { useRouter, useSegments } from "expo-router";
// import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
// // import { auth } from "./firebase";
// // import { signInWithEmailAndPassword, signInWithGoogle, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

// const AuthContext = React.createContext(null);

// // This hook can be used to access the user info.
// export function useAuth() {
//   return React.useContext(AuthContext);
// }

// // This hook will protect the route access based on user authentication.
// function useProtectedRoute(user) {
//   const segments = useSegments();
//   const router = useRouter();

//   React.useEffect(() => {
//     const inAuthGroup = segments[0] === "(auth)";

//     if (
//       // If the user is not signed in and the initial segment is not anything in the auth group.
//       !user &&
//       !inAuthGroup
//     ) {
//       // Redirect to the sign-in page.
//       router.replace("/sign-in");
//     } else if (user && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace("/");
//     }
//   }, [user, segments]);
// }

// export function ProviderAuth(props) {
//   const [user, setAuth] = React.useState(null);

//   React.useEffect(() => {
//     // This listener will be called every time the user's authentication state changes.
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         // User is signed in.
//         const { uid, email } = firebaseUser;
//         setAuth({ uid, email });
//         storeData({ uid, email });
//       } else {
//         // User is signed out.
//         setAuth(null);
//         deleteData();
//       }
//     });

//     // Return a function that will unsubscribe the listener when the component unmounts.
//     return () => unsubscribe();
//   }, []);

//   const googleAuthProvider = new GoogleAuthProvider();

//   console.log("user in provider", user)

//   useProtectedRoute(user);

//   const storeData = async (value) => {
//     try {
//       const jsonValue = JSON.stringify(value);
//       await AsyncStorage.setItem("user", jsonValue);
//     } catch (e) {
//       // saving error
//     }
//   };

//   const deleteData = async () => {
//     try {
//       await AsyncStorage.removeItem("user");
//     } catch (e) {
//       // saving error
//     }
//   };

//   const signInWithEmailPasswordProvider = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const firebaseUser = userCredential.user;
//       setAuth(firebaseUser);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const signInWithGoogleProvider = async () => {
//     try {
//       const userCredential = await signInWithPopup(auth, googleAuthProvider);
//       const firebaseUser = userCredential.user;
//       setAuth(firebaseUser);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const signOut = async () => {
//     await auth.signOut();
//   };

//   const signUpWithEmailPasswordProvider = async (email, password) => {
//     try {
//       const newUser = await createUserWithEmailAndPassword(email, password);
//       console.log({ newUser });

//     } catch (e) {
//       console.log("Error", e)
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         signInWithEmailPasswordProvider,
//         signInWithGoogleProvider,
//         signOut,
//         signUpWithEmailPasswordProvider,
//         user,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// }
