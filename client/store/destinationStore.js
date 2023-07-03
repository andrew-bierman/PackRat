import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

export const destinationSlice = createSlice({
  name: "destination",
  initialState: { 
    data: null, 
    currentDestination: null,
    status: "idle", 
    error: null },
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
        console.log("processGeoJSON.fulfilled action", action);
        state.status = "succeeded";
        state.currentDestination = action.payload.data.newInstance;
      })
      .addCase(processGeoJSON.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getDestination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDestination.fulfilled, (state, action) => {
        console.log("getDestination.fulfilled action", action);
        state.status = "succeeded";
        state.currentDestination = action.payload.data.destination;
      })
      .addCase(getDestination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default destinationSlice.reducer;
