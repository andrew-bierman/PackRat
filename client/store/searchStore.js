import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { api } from "../constants/api";

import axios from "axios";

export const fetchPhotonSearchResults = createAsyncThunk(
  "search/fetchPhotonSearchResults",
  async (searchString) => {
    const url = api + `/osm/photon/search?searchString=${encodeURIComponent(searchString)}`;

    try {
      const response = await axios.get(url);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("error:" + error);
    }
  }
);

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({
  searchResults: [],
  selectedSearchResult: {},
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    setSelectedSearchResult(state, action) {
      state.selectedSearchResult = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotonSearchResults.pending, (state, action) => {
        state.searchResults = [];
      })
      .addCase(fetchPhotonSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchPhotonSearchResults.rejected, (state, action) => {
        state.searchResults = [];
      })
  },
});

export const { selectAll, selectById } =
  searchAdapter.getSelectors((state) => state.search);

export const { setSearchResults, setSelectedSearchResult, clearSearchResults } =
  searchSlice.actions;

export const selectIsLoading = (state) => state.search.isLoading;
export const selectError = (state) => state.search.error;
  

export default searchSlice.reducer;
