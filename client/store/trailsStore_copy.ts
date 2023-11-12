import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
// import axios from '~/config/axios';
import { api } from '../constants/api';
import { trpc } from '../trpc';

export const fetchTrails = createAsyncThunk(
  'trails/fetchTrails',
  async ({ lat, lon, selectedSearch }) => {
    let params = '?';

    if (lat) {
      params += `lat=${lat}`;
    }
    if (lon) {
      params += `&lon=${lon}`;
    }

    const url = api + '/osm/trails' + params;

    try {
      // const response = await axios.get(url);
      // const trails = response.data.features;

      const response = await trpc.getTrailsOSM.query({ lat, lon });

      const trails = response.features;

      const filteredTrails = trails
        .filter(
          (trail) =>
            trail.properties.name && trail.properties.name !== selectedSearch,
        )
        .map((trail) => trail.properties.name)
        .slice(0, 25);

      return { trails, filteredTrails };
    } catch (error) {
      console.error('error:' + error);
    }
  },
);

const trailsAdapter = createEntityAdapter();

const initialState = trailsAdapter.getInitialState({
  isLoading: false,
  error: null,
  trailsDetails: [],
  trailNames: [],
  trails: [],
});

const trailsSlice = createSlice({
  name: 'trails',
  initialState,
  reducers: {
    setTrails: trailsAdapter.setAll,
    setFilteredTrails: (state, action) => {
      state.trailNames = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrails.pending, (state, action) => {
        state.trailsDetails = [];
        state.trailNames = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrails.fulfilled, (state, action) => {
        trailsAdapter.setAll(state, action.payload.trails);
        state.trailNames = action.payload.filteredTrails;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTrails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  selectAll: selectAllTrails,
  selectById: selectTrailsById,
  selectIds: selectTrailsIds,
} = trailsAdapter.getSelectors((state) => state.trails);

export const { setTrails, setFilteredTrails, setError, setLoading } =
  trailsSlice.actions;

export default trailsSlice.reducer;
