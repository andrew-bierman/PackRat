import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

// we use the original axios to prevent circular dependency with custom axios instance
import axios from 'axios';
import { api } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { trpc } from '../trpc';

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
  user: null,
  loading: false,
  error: null,
});

// Thunks for async actions
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      // Add check for unique username here.
      const user = await trpc.signUp.mutate({
        name,
        username,
        email,
        password,
      });
      return user;
      // await AsyncStorage.setItem('authToken', response.data.user.token);
      // return response.data.user;
      // const response = await axios.post(`${api}/user/signup`, {
      //   name,
      //   username, // add username
      //   email,
      //   password,
      // });
      // await AsyncStorage.setItem('authToken', response.data.user.token);
      // return response.data.user;

      return await trpc.signUp.mutate({ name, username, email, password });
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.response.data.error);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${api}/user/signin`, {
      //   email,
      //   password,
      // });
      // await AsyncStorage.setItem('authToken', response.data.user.token);
      // return response.data.user;

      const response = await trpc.signIn.mutate({ email, password });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    // Perform any sign-out operations here
    await AsyncStorage.removeItem('authToken');
    return null;
  } catch (error) {
    console.log(error.message);
    return rejectWithValue('Sign-out failed');
  }
});

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async ({ idToken }, { rejectWithValue }) => {
    try {
      // const response = await axios.post(`${api}/user/google`, {
      //   idToken,
      // });

      // await AsyncStorage.setItem('authToken', response.data.user.token);
      // return response.data.user;

      const response = await trpc.googleSignin.query({ idToken });
      return response?.user;
    } catch (error) {
      console.log('error.response.data.error', error.response.data.error);
      return rejectWithValue(error);
    }
  },
);

export const editUser = createAsyncThunk('auth/editUser', async (user) => {
  const response = await axios.put(`${api}/user/`, user);
  return response.data;
});

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (user) => {
    const response = await axios.post(`${api}/user/updatepassword`, user);
    return response.data;
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // add reducers here
    resetState(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
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
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        authAdapter.setAll(state, [action.payload]);
        state.user = action.payload;

        state.loading = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const authReducer = authSlice.reducer;
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  authAdapter.getSelectors((state) => state.auth);

export const resetState = authSlice.actions.resetState;

export default authSlice.reducer;
