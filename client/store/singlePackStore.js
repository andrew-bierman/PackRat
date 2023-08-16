// redux toolkit slice for single pack

import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";

import axios from "axios";

import { api } from "../constants/api";

const singlePackAdapter = createEntityAdapter(
  {
    selectId: (singlePack) => singlePack._id,
  }
);

// Step 2: Create the initial state using the entity adapter
const initialState = singlePackAdapter.getInitialState({
  singlePack: {},
  isLoading: false,
  error: null,
});

export const fetchSinglePack = createAsyncThunk(
  "packs/fetchSinglePack",
  async (packId) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${api}/pack/p/${packId}`,config);
    return response.data;
  }
);

const singlePackSlice = createSlice({
  name: "singlePack",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePack.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSinglePack.fulfilled, (state, action) => {
        singlePackAdapter.setAll(state.singlePack, action.payload);
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

export const {
  selectById: selectSinglePackById,
  selectAll: selectAllSinglePacks,
} = singlePackAdapter.getSelectors((state) => state.singlePack);

export default singlePackSlice.reducer;
