import fetcher from "../api/fetcher";
import { api } from "../constants/api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../constants/queryClient";
import { useAuth } from "../auth/provider";
import { app, auth } from "../auth/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginUser = async (user) => {
  try {
    const { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const token = user.getIdToken();

        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      

  } catch (error) {
    console.log(error);
  }

};

export default function useLogin() {
  const { signIn } = useAuth();

  const mutation = useMutation({
    mutationFn: async (user) => {
      return loginUser(user);
    },
    onSuccess: (data, variables, context) => {
      signIn(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { loginUser: mutation };
}