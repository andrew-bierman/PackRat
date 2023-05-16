import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../auth/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import axios from "axios";
import { api } from "../constants/api";
import { Alert } from "react-native";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/signup`, { email, password, name });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);


export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/signin`, { email, password });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

// export const signOut = createAsyncThunk(
//   "auth/signOut",
//   async (_, { rejectWithValue }) => {
//     console.log("signOut")
//     try {
//       // await firebaseSignOut(auth);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const signOut = createAsyncThunk(
  "auth/signOut",
  async () => {
    console.log("signOut")
    try {
      return null;
    } catch (error) {
      return console.log(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/google`, { token: idToken });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
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


export const createUserInMongoDB = createAsyncThunk(
  "auth/signUpWithEmailPassword",
  async ({ uid, name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/create-mongodb-user`, {
        email,
        name,
        firebaseUid: uid,
        password,
      });
      return response.data;
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

        // createMongoDbUser({ email: action.payload.email, firebaseUid: action.payload.uid });

      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        // console.log("userinfo", action.payload);
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
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
      .addCase(createUserInMongoDB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserInMongoDB.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(createUserInMongoDB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;
