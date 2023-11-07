// // import { api } from "../constants/api";
// // import { useMutation } from "@tanstack/react-query";
// // import { queryClient } from "../constants/queryClient";
// import { useDispatch } from "react-redux";
// // import { useAuth } from "../auth/provider";
// // import { signInWithEmailAndPassword, signInWithGoogle } from "firebase/auth";
// import { createUserInMongoDB, signIn, signInWithGoogle } from "../store/authStore";

// export default function useRegister() {
//   const dispatch = useDispatch();

//   const signupWithEmail = (uid, name, email, password) => {
//     dispatch(createUserInMongoDB({ uid, name,email, password }));
//   };

//   return {
//     signupWithEmail
//   };
// }
