// redux toolkit slice for single pack

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

export const fetchSingleTrip = createAsyncThunk(
  "trips/fetchSingleTrip",
  async (tripId) => {
    const response = await axios.get(`${api}/trip/t/${tripId}`);
    return response.data;
  }
);

const singleTripAdapter = createEntityAdapter();

const initialState = singleTripAdapter.getInitialState({
  singleTrip: {},
  isLoading: false,
  error: null,
});

const singleTripSlice = createSlice({
  name: "singleTrip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleTrip.fulfilled, (state, action) => {
        console.log("fetchSingleTrip.fulfilled", action.payload);
        singleTripAdapter.setAll(state.singleTrip, action.payload);
        state.singleTrip = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllSingleTrip, selectById: selectSingleTripById } =
  singleTripAdapter.getSelectors((state) => state.singleTrip);

export const selectIsLoading = (state) => state.singleTrip.isLoading;
export const selectError = (state) => state.singleTrip.error;  

export default singleTripSlice.reducer;
