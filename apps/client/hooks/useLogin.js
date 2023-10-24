// // import { api } from "../constants/api";
// // import { useMutation } from "@tanstack/react-query";
// // import { queryClient } from "../constants/queryClient";
// import { useDispatch } from "react-redux";
// // import { useAuth } from "../auth/provider";
// // import { signInWithEmailAndPassword, signInWithGoogle } from "firebase/auth";
// import { signIn, signInWithGoogle } from "../store/authStore";
// import { auth, googleProvider } from "../auth/firebase";

// export default function useLogin() {
//   const dispatch = useDispatch();

//   const loginUserWithEmailAndPassword = (email, password) => {
//     dispatch(signIn({ email, password }));
//   };

//   const loginUserWithGoogle = (idToken) => {
//     dispatch(signInWithGoogle({ idToken }));
//   };

//   return {
//     loginUserWithEmailAndPassword,
//     loginUserWithGoogle,
//   };
// }
