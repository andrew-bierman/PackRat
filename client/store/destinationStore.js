import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// Create an entity adapter for the destination data
const destinationAdapter = createEntityAdapter();

// Create a slice for the destination state
const destinationSlice = createSlice({
  name: 'destination',
  initialState: destinationAdapter.getInitialState({
    // Initialize the state with default values
    data: null,
    currentDestination: null,
    photonDetails: null,
    selectedSearchResult: null,
    weatherObject: null,
    weatherWeek: null,
    status: 'idle',
    error: null,
  }),
  reducers: {
    // Define reducer functions to update specific parts of the state
    setData: (state, action) => {
      // Update the `data` field in the state with the payload value
      state.data = action.payload;
    },
    setSelectedSearchResult: (state, action) => {
      // Update the `selectedSearchResult` field in the state with the payload value
      state.selectedSearchResult = action.payload;
    },
    setWeatherObject: (state, action) => {
      // Update the `weatherObject` field in the state with the payload value
      state.weatherObject = action.payload;
    },
    setWeatherWeek: (state, action) => {
      // Update the `weatherWeek` field in the state with the payload value
      state.weatherWeek = action.payload;
    },
  },
});

export const { setSelectedSearchResult, setWeatherObject, setWeatherWeek } =
  destinationSlice.actions;
export default destinationSlice.reducer;
