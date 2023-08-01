import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";
import { Alert } from "react-native";

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
  user: null,
  loading: false,
  error: null,
});

// Thunks for async actions
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      // Add check for unique username here.
      const response = await axios.post(`${api}/user/signup`, {
        name,
        username,  // add username
        email,
        password,
      });
      return response.data.user;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/signin`, {
        email,
        password,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    // Perform any sign-out operations here
    return null;
  } catch (error) {
    console.log(error.message);
    return rejectWithValue("Sign-out failed");
  }
});

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/user/google`, {
        idToken,
      });
      return response.data.user;
    } catch (error) {
      console.log('error.response.data.error', error.response.data.error);
      return rejectWithValue(error);
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
        authAdapter.setAll(state, [action.payload]);
        state.user = action.payload;
        state.loading = false;
        state.error = null;
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
        authAdapter.setAll(state, [action.payload]);
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
        authAdapter.removeAll(state);
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
        authAdapter.setAll(state, [action.payload]);
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const authReducer = authSlice.reducer;
export const { selectAll: selectAllUsers, selectById: selectUserById } = authAdapter.getSelectors((state) => state.auth);
export default authSlice.reducer;