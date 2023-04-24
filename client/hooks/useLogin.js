import { api } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";
import { useAuth } from "../auth/provider";
import { signInWithEmailAndPassword, signInWithGoogle } from "firebase/auth";
import { auth, googleProvider } from "../auth/firebase";

const loginUserWithEmailAndPassword = async (user) => {
  try {
    const { email, password } = user;
    console.log('signInWithEmailAndPassword', user)
    console.log('before signInWithEmailAndPassword', email, password)
    console.log('before signInWithEmailAndPassword', auth)
    debugger
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorCode, errorMessage)
      const firebaseUser = userCredential.user;
      const token = firebaseUser.getIdToken();
      console.log('loginUser user', firebaseUser);
      return firebaseUser;
    });
    console.log('after signInWithEmailAndPassword', userCredential)
  } catch (error) {
    console.log(error);
  }
};

const loginUserWithGoogle = async () => {
  try {
    const userCredential = await signInWithGoogle(auth);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();
    console.log('loginUser user', firebaseUser);
    return firebaseUser;
  } catch (error) {
    console.log(error);
  }
};

export default function useLogin() {
  const { signInWithEmailPasswordProvider, signInWithGoogleProvider } = useAuth();

  const mutation = useMutation({
    mutationFn: async (user) => {
      console.log('mutation user', user)
      if (user.from === "UserSignIn") {
        return loginUserWithEmailAndPassword(user);
      } else if (user.from === "google") {
        return loginUserWithGoogle();
      }
    },
    onSuccess: (data, variables, context) => {
      console.log('onSuccess', data)
      // signInWithEmailAndPassword(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { loginUser: mutation };
}
