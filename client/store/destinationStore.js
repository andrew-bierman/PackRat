import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../constants/api";

export const processGeoJSON = createAsyncThunk(
  "destination/processGeoJSON",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/osm/process/geojson`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDestination = createAsyncThunk(
  "destination/getDestination",
  async (destinationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/osm/destination/${destinationId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const photonDetails = createAsyncThunk(
  "destination/photonDetails",
  async (data, { rejectWithValue }) => {
    try {
      const { properties } = data;
      const { osm_id, osm_type } = properties;

      if (!osm_id || !osm_type) return rejectWithValue("Invalid request parameters");

      const response = await axios.get(`${api}/osm/photonDetails/${osm_type}/${osm_id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const destinationAdapter = createEntityAdapter();

const destinationSlice = createSlice({
  name: "destination",
  initialState: destinationAdapter.getInitialState({
    data: null,
    currentDestination: null,
    photonDetails: null,
    status: "idle",
    error: null,
  }),
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processGeoJSON.pending, (state) => {
        state.status = "loading";
      })
      .addCase(processGeoJSON.fulfilled, (state, action) => {
        state.status = "succeeded";
        destinationAdapter.upsertOne(state.currentDestination, action.payload.data.newInstance);
      })
      .addCase(processGeoJSON.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDestination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDestination.fulfilled, (state, action) => {
        state.status = "succeeded";
        destinationAdapter.upsertOne(state.currentDestination, action.payload.data.destination);
      })
      .addCase(getDestination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(photonDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(photonDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        destinationAdapter.upsertOne(state.photonDetails, action.payload.data);
      })
      .addCase(photonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default destinationSlice.reducer;
