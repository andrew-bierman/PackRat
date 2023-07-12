// redux toolkit slice for single pack

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

export const fetchSinglePack = createAsyncThunk(
  "packs/fetchSinglePack",
  async (packId) => {
    const response = await axios.get(`${api}/pack/p/${packId}`);
    return response.data;
  }
);

const singlePackAdapter = createEntityAdapter();

const initialState = singlePackAdapter.getInitialState({
  singlePack: {},
  isLoading: false,
  error: null,
});

const singlePackSlice = createSlice({
  name: "singlePack",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSinglePack.fulfilled, (state, action) => {
        // singlePackAdapter.setAll(state.singlePack. action.payload);
        state.singlePack = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSinglePack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectAll, selectById} =
  singlePackAdapter.getSelectors((state) => state.singlePack);

export const selectIsLoading = (state) => state.singlePack.isLoading;
export const selectError = (state) => state.singlePack.error;  

export default singlePackSlice.reducer;
