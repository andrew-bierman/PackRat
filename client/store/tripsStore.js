import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

const tripsAdapter = createEntityAdapter();

const initialState = tripsAdapter.getInitialState({
  trips: [],
  newTrip: {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    destination: "",
    trail: "",
    weather: {},
    packId: "",
  },
  isLoading: false,
  error: null,
});

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (tripId) => {
    const response = await axios.delete(`${api}/trip/${tripId}`);
    return response.data;
  }
);

export const fetchUserTrips = createAsyncThunk(
  "trips/fetchUserTrips",
  async (ownerId) => {
    const response = await axios.get(`${api}/trip/${ownerId}`);
    return response.data;
  }
);

export const addTrip = createAsyncThunk("trips/addTrip", async (newTrip) => {
  const response = await axios.post(`${api}/trip/`, newTrip);
  return response.data;
});

export const editTrip = createAsyncThunk(
  "trips/editTrip",
  async (updatedTrip) => {
    const response = await axios.put(`${api}/trip/`, updatedTrip);
    return response.data;
  }
);

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    updateNewTrip(state, action) {
      tripsAdapter.updateOne(state, {
        id: action.payload._id,
        newTrip: action.payload
      })
      state.newTrip = action.payload;
    },
    updateNewTripVersatile(state, action) {
      // accepts an object with a key and value
      state.newTrip[action.payload.key] = action.payload.value;
    },
    updateNewTripPack(state, action) {
      console.log("action.payload in updatenewtrippack", action.payload);
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
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        trail: "",
        weather: {},
        packId: "",
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
        const deletedTrip = action.payload;
        const index = state.trips.findIndex(
          (trip) => trip._id === deletedTrip._id
        );
        if (index !== -1) {
          state.trips.splice(index, 1);
        }
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
        state.trips = action.payload;
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
        state.trips.push(action.payload.createdTrip);
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
        const updatedTrip = action.payload;
        const index = state.trips.findIndex(
          (trip) => trip._id === updatedTrip._id
        );
        if (index !== -1) {
          state.trips[index] = updatedTrip;
        }
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
