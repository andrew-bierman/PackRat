import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from "@env"

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       const email = user.email;
//       loginUser.mutate({ email, password: "", from: "GoogleSignIn" });
//       signIn({ email, password: "", from: "GoogleSignIn" });
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const signInWithGoogle = async () => {
//     return new Promise((resolve, reject) => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 resolve({ name: result.user.displayName, email: result.user.email })
//             })
//             .catch(() => {
//                 resolve({ message: "error" })
//             });
//     })
// };
