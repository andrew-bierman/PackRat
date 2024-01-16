import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { api } from '../constants/api';
import axios from 'app/config/axios';
import { trpc } from '../trpc';

export const fetchPhotonSearchResults = createAsyncThunk(
  'search/fetchPhotonSearchResults',
  async (searchString: string) => {
    const url =
      api +
      `/osm/photon/search?searchString=${encodeURIComponent(searchString)}`;

    try {
      // const response = await axios.get(url);
      // return response.data;
      return await trpc.getPhotonResults.query({ searchString });
    } catch (error) {
      console.error('error:' + error);
    }
  },
);
export const fetchItemsSearchResults = createAsyncThunk(
  'search/fetchItemsSearchResults',
  async (searchString: string) => {
    const url = api + `/item/global?search=${encodeURIComponent(searchString)}`;
    try {
      // const response = await axios.get(url);
      // return response.data;
      return await trpc.getItemsGlobally.query({
        limit: 5,
        page: 0,
        searchString,
      });
    } catch (error) {
      console.error('error:' + error);
    }
  },
);

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({
  searchResults: [],
  selectedSearchResult: {},
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSelectedSearchResult(state, action) {
      state.selectedSearchResult = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
      state.selectedSearchResult = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotonSearchResults.pending, (state) => {
        state.searchResults = [];
      })
      .addCase(fetchPhotonSearchResults.fulfilled, (state, action) => {
        searchAdapter.setAll(state, action.payload);
        state.searchResults = action.payload;
      })
      .addCase(fetchPhotonSearchResults.rejected, (state) => {
        state.searchResults = [];
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
