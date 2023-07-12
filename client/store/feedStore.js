import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { api } from "../constants/api";
import axios from "axios";

const feedAdapter = createEntityAdapter();

const initialState = feedAdapter.getInitialState({
  publicPacks: [],
  publicTrips: [],
  isLoading: false,
  error: null,
});

export const getPublicPacks = createAsyncThunk(
  "feed/getPublicPacks",
  async (queryBy) => {
    const response = await axios.get(
      `${api}/pack/?queryBy=${queryBy || "Favorite"}`
    );
    return response.data;
  }
);

export const getPublicTrips = createAsyncThunk(
  "feed/getPublicTrips",
  async (queryBy) => {
    const response = await axios.get(
      `${api}/trip/?queryBy=${queryBy || "Favorite"}`
    );
    return response.data;
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicPacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublicPacks.fulfilled, (state, action) => {
        // map over the array of packs and add a type property to each pack
        state.publicPacks = action.payload
        .map((pack) => {
          return {
            ...pack,
            type: "pack",
          };
        })
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
        // map over the array of trips and add a type property to each trip
        state.publicTrips = action.payload
        .map((trip) => {
          return {
            ...trip,
            type: "trip",
          };
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getPublicTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllFeed,
  selectById: selectFeedById,
} = feedAdapter.getSelectors((state) => state.feed);

export const selectIsLoading = (state) => state.feed.isLoading;
export const selectError = (state) => state.feed.error;

export default feedSlice.reducer;
