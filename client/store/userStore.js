import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { auth } from "../auth/firebase";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import axios from "axios";
import { api } from "../constants/api";
import { Alert } from "react-native";

const initialState = {
  user: null,
  loading: false,
  error: null,
};


export const fetchUser = createAsyncThunk(
    "packs/fetchUser",
    async (userId) => {
      const response = await axios.get(`${api}/user/${userId}`);
      return response.data;
    }
  );

  const userSlice = createSlice({
    name: "users",
    initialState: {
      user: {},
      isLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isLoading = false;
          state.error = null;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        
  
    },
  });

  export default userSlice.reducer;