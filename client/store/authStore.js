import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// we use the original axios to prevent circular dependency with custom axios instance
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        return { ...state, loading: true, error: null };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: null,
          user: action.payload,
        };
        authAdapter.setAll(newState, [action.payload]);
        return newState;
      })
      .addCase(signUp.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(signIn.pending, (state) => {
        return { ...state, loading: true, error: null, user: null };
      })
      .addCase(signIn.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: null,
          user: action.payload,
        };
        authAdapter.setAll(newState, [action.payload]);
        return newState;
      })
      .addCase(signIn.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload, user: null };
      })
      .addCase(signOut.pending, (state) => {
        return { ...state, loading: true, error: null };
      })
      .addCase(signOut.fulfilled, (state) => {
        const newState = {
          ...state,
          loading: false,
          error: null,
          user: null,
        };
        authAdapter.removeAll(newState);
        return newState;
      })
      .addCase(signOut.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      })
      .addCase(signInWithGoogle.pending, (state) => {
        return { ...state, loading: true, error: null };
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: null,
          user: action.payload,
        };
        authAdapter.setAll(newState, [action.payload]);
        return newState;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        return { ...state, loading: false, error: action.payload };
      });
  },
});

export const authReducer = authSlice.reducer;
export const { selectAll: selectAllUsers, selectById: selectUserById } = authAdapter.getSelectors((state) => state.auth);
export default authSlice.reducer;