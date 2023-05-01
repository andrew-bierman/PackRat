import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../constants/api";
import axios from "axios";

export const getPublicPacks = createAsyncThunk("feed/getPublicPacks", async (queryBy) => {
  const response = await axios.get(`${api}/pack/?queryBy=${queryBy || "Favorite"}`);
  return response.data;
});

export const getPublicTrips = createAsyncThunk("feed/getPublicTrips", async () => {
  const response = await axios.get(`${api}/trips/public`);
  return response.data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    publicPacks: [],
    publicTrips: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicPacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublicPacks.fulfilled, (state, action) => {
        state.publicPacks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPublicPacks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getPublicTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublicTrips.fulfilled, (state, action) => {
        state.publicTrips = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPublicTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
