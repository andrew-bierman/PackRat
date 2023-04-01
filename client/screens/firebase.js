import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FIREBASE_API_KEY } from "@env"

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "auth-8b1ef.firebaseapp.com",
    projectId: "auth-8b1ef",
    storageBucket: "auth-8b1ef.appspot.com",
    messagingSenderId: "445273762769",
    appId: "1:445273762769:web:81f403cae7cb5fe3760ef0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log({ name: result.user.displayName, email: result.user.email })
                resolve({ name: result.user.displayName, email: result.user.email })
            })
            .catch(() => {
                resolve({ message: "error" })
            });

    })
};
