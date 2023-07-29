import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../constants/api";
import axios from "axios";

export const fetchParks = createAsyncThunk(
  "parks/fetchParks",
  async ({ lat, lon, selectedSearch }) => {
    let params = `?`;

    if (lat) params += `lat=${lat}`;
    if (lon) params += `&lon=${lon}`;

    const url = api + "/osm/parks" + params;

    try {
      const response = await axios.get(url);
      const parks = response.data.features;

      const filteredParks = parks
        .filter(
          (park) =>
            park.properties.name && park.properties.name !== selectedSearch
        )
        .map((park) => park.properties.name)
        .slice(0, 25);

      return { parks, filteredParks };
    } catch (error) {
      console.error("error:" + error);
    }
  }
);

export const parksSlice = createSlice({
  name: "parks",
  initialState: {
    parksDetails: [],
    parkNames: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParks.pending, (state, action) => {
        state.parksDetails = [];
        state.parkNames = [];
        isLoading = true;
        error = null;
      })
      .addCase(fetchParks.fulfilled, (state, action) => {
        state.parksDetails = action.payload.parks;
        state.parkNames = action.payload.filteredParks;
        isLoading = false;
        error = null;
      })
      .addCase(fetchParks.rejected, (state, action) => {
        state.parksDetails = [];
        state.parkNames = [];
        isLoading = false;
        error = null;
      });
  },
});

// Action creators are generated for each case reducer function
export default parksSlice.reducer;
