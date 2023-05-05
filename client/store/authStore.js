import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import axios from "axios";
import { api } from "../constants/api";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(email, password)

      // Create a user in the database
      await createUserInMongoDB({ email: response.user.email, uid: response.user.uid, password })

      // Link the user's accounts
      const idToken = await auth.currentUser.getIdToken();
      await linkFirebaseAuthInDBRequest(idToken)

      return response.user;

    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Link the user's accounts
      const idToken = await auth.currentUser.getIdToken();
      await linkFirebaseAuthInDBRequest(idToken)


      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const response = await signInWithCredential(auth, credential);
      
      // Obtain the Firebase auth token
      const firebaseAuthToken = await response.user.getIdToken();

      // Link the user's accounts
      const mongoUser = await linkFirebaseAuthInDBRequest(firebaseAuthToken);

      const firebaseUser = response.user;

      if (!mongoUser) {
        await createUserInMongoDB({ email: firebaseUser.email, uid: firebaseUser.uid });
      }

      const mergedResponse = { ...firebaseUser, ...mongoUser };

      console.log("signInWithGoogle mergedResponse:", mergedResponse);
      console.log("signInWithGoogle mongoUser:", mongoUser);

      return mergedResponse;

      return response.user;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const linkFirebaseAuthInDBRequest = async (firebaseAuthToken) => {
  try {
    const token = await auth.currentUser.getIdToken();
    const headers = { Authorization: `Bearer ${token}` };
    const data = { firebaseAuthToken };
    const response = await axios.post(
      `${api}/user/link-firebase-auth`, 
      data, 
      // { headers }
      );
    return response.data;
  } catch (error) {
    console.error("Error in linkFirebaseAuthInDBRequest:", error.message);
  }
}


export const createUserInMongoDB = async ({ email, uid, name, password }) => {
  try {
    const response = await axios.post(`${api}/user/create-mongodb-user`, {
      email,
      firebaseUid: uid,
      name,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error in createUserInMongoDB:", error.message);
  }
}





export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;

        createMongoDbUser({ email: action.payload.email, firebaseUid: action.payload.uid });

      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        // console.log("userinfo", action.payload);
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
