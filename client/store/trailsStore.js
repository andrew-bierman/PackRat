import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { api } from "../constants/api";

import axios from "axios";

const trailsAdapter = createEntityAdapter();

const initialState = trailsAdapter.getInitialState({
  trailsDetails: [],
  trailNames: [],
  isLoading: false,
  error: null,
});

export const fetchTrails = createAsyncThunk(
  "trails/fetchTrails",
  async ({ lat, lon, selectedSearch }) => {
    let params = `?`;

    if (lat) params += `lat=${lat}`;
    if (lon) params += `&lon=${lon}`;

    const url = api + "/osm/trails" + params;

    try {
      const response = await axios.get(url);
      const trails = response.data.features;

      const filteredTrails = trails
        .filter(
          (trail) =>
            trail.properties.name && trail.properties.name !== selectedSearch
        )
        .map((trail) => trail.properties.name)
        .slice(0, 25);

      return { trails, filteredTrails };
    } catch (error) {
      console.error("error:" + error);
    }
  }
);

export const trailsSlice = createSlice({
  name: "trails",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrails.pending, (state, action) => {
        state.trailsDetails = [];
        state.trailNames = [];
        isLoading = true;
        error = null;
      })
      .addCase(fetchTrails.fulfilled, (state, action) => {
        state.trailsDetails = action.payload.trails;
        state.trailNames = action.payload.filteredTrails;
        isLoading = false;
        error = null;
      })
      .addCase(fetchTrails.rejected, (state, action) => {
        state.trailsDetails = [];
        state.trailNames = [];
        isLoading = false;
        error = action.error;
      });
  },
});

// export const filterTrailsForNames = (trailsDetails, selectedSearch) => {
//   console.log("trailsDetails", trailsDetails);
//   console.log("selectedSearch", selectedSearch);
//   if (trailsDetails && trailsDetails.length > 0) {
//     const filteredTrails = trailsDetails
//       .filter((trail) => {
//         if(trail.properties.name && trail.properties.name !== selectedSearch){
//           return trail
//         }
//         // trail.properties.name !== selectedSearch
//       })
//       .map((trail) => trail.properties.name)
//       .slice(0, 25);
//     return filteredTrails;
//   } else {
//     return [];
//   }
// };

export const { selectAll: selectTrails, selectById: selectTrailById } =
  trailsAdapter.getSelectors((state) => state.trails);

export const selectIsLoading = (state) => state.trails.isLoading;
export const selectError = (state) => state.trails.error;

export default trailsSlice.reducer;
