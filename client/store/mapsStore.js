import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

// we use the original axios to prevent circular dependency with custom axios instance
import axios from 'axios';
import { api } from '../constants/api';

const mapAdapter = createEntityAdapter({
  selectId: (map) => map._id,
});

const initialState = mapAdapter.getInitialState({
  maps: [],
  selectedMap: {},
  loading: false,
  error: null,
});

export const fetchUserMaps = createAsyncThunk(
  'map/fetchUserMaps',
  async (ownerId) => {
    const response = await axios.get(`${api}/map/${ownerId}`);
    return response.data;
  },
);

export const addUserMap = createAsyncThunk('map/addUserMap', async (newMap) => {
  const response = await axios.post(`${api}/map/`, newMap);
  return response.data;
});

export const mapSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    updateSelectedMap(state, action) {
      state.selectedMap = action.payload;
    },
    resetSelectedMap(state, action) {
      state.selectedMap = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserMaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserMaps.fulfilled, (state, action) => {
        state.maps = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserMaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserMap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserMap.fulfilled, (state, action) => {
        state.maps = [...state.maps, action.payload.map];
        state.selectedMap = action.payload.map;
        state.loading = false;
        state.error = null;
      })
      .addCase(addUserMap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateSelectedMap, resetSelectedMap } = mapSlice.actions;

export const mapReducer = mapSlice.reducer;

export default mapSlice.reducer;
