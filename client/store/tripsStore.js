import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async (tripId) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(`${api}/trip`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      data: {
        tripId,
      },
    });
    return response.data;
  }
);

export const fetchUserTrips = createAsyncThunk(
  "trips/fetchUserTrips",
  async (ownerId) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${api}/trip/${ownerId}`,config);
    return response.data;
  }
);

export const addTrip = createAsyncThunk("trips/addTrip", async (newTrip) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${api}/trip/`, newTrip,config);
    return response.data;
    
  } catch (error) {
    
  }
});

export const editTrip = createAsyncThunk(
  "trips/editTrip",
  async (updatedTrip) => {
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.put(`${api}/trip/`, updatedTrip,config);
    return response.data;
  }
);

const tripsAdapter = createEntityAdapter({
  selectId: (trip) => trip._id,
});

const initialState = tripsAdapter.getInitialState({
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

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    updateNewTrip(state, action) {
      state.newTrip = action.payload;
    },
    updateNewTripVersatile(state, action) {
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
        tripsAdapter.addOne(state, action.payload.createdTrip);
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
