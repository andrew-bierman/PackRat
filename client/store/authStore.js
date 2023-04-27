import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";


const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(email, password);
      console.log(response);
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
      console.log("signInWithGoogle user:", response.user); // Add this line
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


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
