// redux toolkit slice for single pack

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

export const fetchSingleTrip = createAsyncThunk(
  "trips/fetchSingleTrip",
  async (tripId) => {
    const response = await axios.get(`${api}/trip/t/${tripId}`);
    return response.data;
  }
);

const singleTripSlice = createSlice({
  name: "singleTrip",
  initialState: {
    singleTrip: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleTrip.fulfilled, (state, action) => {
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

export default singleTripSlice.reducer;
