import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { api } from "../constants/api";
import axios from "~/config/axios";

export const fetchPhotonSearchResults = createAsyncThunk(
  "search/fetchPhotonSearchResults",
  async (searchString: string) => {
    const url =
      api +
      `/osm/photon/search?searchString=${encodeURIComponent(searchString)}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("error:" + error);
    }
  },
);
export const fetchItemsSearchResults = createAsyncThunk(
  "search/fetchItemsSearchResults",
  async (searchString:string) => {
    const url = api + `/item/global?search=${encodeURIComponent(searchString)}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("error:" + error);
    }
  },
);

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({
  searchResults: [],
  selectedSearchResult: {},
  isLoading: false,
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedSearchResult(state, action) {
      state.selectedSearchResult = action.payload;
    },
    clearSearchResults(state) {
      searchAdapter.removeAll(state);
      state.searchResults = [];
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotonSearchResults.pending, (state) => {
        state.searchResults = [];
        state.isLoading = true;
      })
      .addCase(fetchPhotonSearchResults.fulfilled, (state, action) => {
        searchAdapter.setAll(state, action.payload);
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPhotonSearchResults.rejected, (state) => {
        state.searchResults = [];
        state.isLoading = false;
      })
      .addCase(fetchItemsSearchResults.pending, (state) => {
        state.searchResults = [];
      })
      .addCase(fetchItemsSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(fetchItemsSearchResults.rejected, (state) => {
        state.searchResults = [];
      });
  },
});

export const { setSelectedSearchResult, clearSearchResults } =
  searchSlice.actions;
export default searchSlice.reducer;
