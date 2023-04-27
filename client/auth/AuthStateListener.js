import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser, signInWithGoogle, signOut } from "../store/authStore";

export function AuthStateListener() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const store = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in, update the Redux store
        //   dispatch(signInWithGoogle({ idToken: await user.getIdToken() }));
            if(store !== null){
                // navigation.navigate("Home");
            }
        } else {
          // User is signed out, update the Redux store
          dispatch(signOut());
          if (store === null) {
            navigation.navigate("sign-in");
          }
        }
      } catch (error) {
        console.log(error);
      }
    });

    // Clean up the listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [auth, dispatch, store]);

  return null;
}
