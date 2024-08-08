import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

export const deleteTrip = createAsyncThunk(
  'trips/deleteTrip',
  async (tripId) => {
    // const response = await axios.delete(`${api}/trip`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   data: {
    //     tripId,
    //   },
    // });
    // return response.data;
    return await trpc.deleteTrip.mutate({ tripId });
  },
);

export const fetchUserTrips = createAsyncThunk(
  'trips/fetchUserTrips',
  async (ownerId) => {
    // const response = await axios.get(`${api}/trip/${ownerId}`);
    // return response.data;
    return await trpc.getTrips.query({ owner_id: ownerId });
  },
);

export const addTrip = createAsyncThunk('trips/addTrip', async (newTrip) => {
  return await trpc.addTrip.mutate(newTrip);
});

export const editTrip = createAsyncThunk(
  'trips/editTrip',
  async (updatedTrip) => {
    // const response = await axios.put(`${api}/trip/`, updatedTrip);
    // return response.data;
    return await trpc.editTrip.mutate(updatedTrip);
  },
);

const tripsAdapter = createEntityAdapter({
  selectId: (trip) => trip._id,
});

const initialState = tripsAdapter.getInitialState({
  newTrip: {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    destination: '',
    trail: '',
    weather: {},
    packId: '',
  },
  isLoading: false,
  error: null,
});

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    updateNewTrip(state, action) {
      state.newTrip = action.payload;
    },
    updateNewTripVersatile(state, action) {
      state.newTrip[action.payload.key] = action.payload.value;
    },
    updateNewTripPack(state, action) {
      console.log('action.payload in updatenewtrippack', action.payload);
      state.newTrip.packId = action.payload;
    },
    updateNewTripWeather(state, action) {
      state.newTrip.weather = action.payload;
    },
    updateNewTripTrail(state, action) {
      state.newTrip.trail = action.payload;
    },
    resetNewTrip(state) {
      state.newTrip = {
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        trail: '',
        weather: {},
        packId: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        tripsAdapter.removeOne(state, action.payload._id);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserTrips.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        tripsAdapter.setAll(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTrip.fulfilled, (state, action) => {
        tripsAdapter.addOne(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(editTrip.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTrip.fulfilled, (state, action) => {
        tripsAdapter.upsertOne(state, action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(editTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateNewTrip,
  updateNewTripVersatile,
  updateNewTripPack,
  updateNewTripWeather,
  updateNewTripTrail,
  resetNewTrip,
} = tripsSlice.actions;

export const { selectAll: selectAllTrips, selectById: selectTripById } =
  tripsAdapter.getSelectors((state) => state.trips);

export const selectIsLoading = (state) => state.trips.isLoading;
export const selectError = (state) => state.trips.error;

export default tripsSlice.reducer;
