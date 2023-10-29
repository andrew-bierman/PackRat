import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

// Define the adapter for packs and trips
const feedAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
});

// Define initial entity state
const initialState = feedAdapter.getInitialState({
  publicPacks: [],
  publicTrips: [],
  isLoading: false,
  error: null,
});

export const getPublicPacks = createAsyncThunk(
  'feed/getPublicPacks',
  async (queryBy) => {
    // const response = await axios.get(
    //   `${api}/pack/?queryBy=${queryBy || 'Favorite'}`,
    // );
    // return response.data;
    return await trpc.getPublicPacks.query({ queryBy: queryBy ?? 'Favorite' });
  },
);

export const getPublicTrips = createAsyncThunk(
  'feed/getPublicTrips',
  async (queryBy) => {
    // const response = await axios.get(
    //   `${api}/trip/?queryBy=${queryBy || 'Favorite'}`,
    // );
    // return response.data;
    return await trpc.getPublicTripsRoute.query({
      queryBy: queryBy ?? 'Favorite',
    });
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublicPacks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPublicPacks.fulfilled, (state, action) => {
        // feedAdapter.upsertMany(state.entities, action.payload.map((pack) => ({ ...pack, type: "pack" })));
        state.publicPacks = action.payload.map((pack) => {
          return {
            ...pack,
            type: 'pack',
          };
        });
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
        //  feedAdapter.upsertMany(state.entities, action.payload.map((trip) => ({ ...trip, type: "trip" })));
        state.publicTrips = action.payload.map((trip) => {
          return {
            ...trip,
            type: 'trip',
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

// Export the adapter selectors
export const {
  selectAll: selectAllPublicPacks,
  selectById: selectPublicPackById,
} = feedAdapter.getSelectors((state) => state.feed.publicPacks);

export const {
  selectAll: selectAllPublicTrips,
  selectById: selectPublicTripById,
} = feedAdapter.getSelectors((state) => state.feed.publicTrips);

export default feedSlice.reducer;
