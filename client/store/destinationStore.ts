import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { trpc } from '../trpc';

export const processGeoJSON = createAsyncThunk(
  'destination/processGeoJSON',
  async (data, { rejectWithValue }) => {
    try {
      // // Make a POST request to the `${api}/osm/process/geojson` endpoint
      // const response = await axios.post(`${api}/osm/process/geojson`, data);

      // // Return the response data
      // return response.data;
      return await trpc.postSingleGeoJSON.mutate({ geojson: data });
    } catch (err) {
      // Handle errors by returning the error response data using `rejectWithValue`
      return rejectWithValue(err.response.data);
    }
  },
);

export const getDestination = createAsyncThunk(
  'destination/getDestination',
  async (destinationId, { rejectWithValue }) => {
    try {
      // // Make a GET request to the `${api}/osm/destination/${destinationId}` endpoint
      // const response = await axios.get(
      //   `${api}/osm/destination/${destinationId}`,
      // );

      // // Return the response data
      // return response.data;
      return await trpc.getDestination.query({ id: destinationId });
    } catch (err) {
      // Handle errors by returning the error response data using `rejectWithValue`
      return rejectWithValue(err.response.data);
    }
  },
);

export const photonDetails = createAsyncThunk(
  'destination/photonDetails',
  async (data, { rejectWithValue }) => {
    try {
      // Extract `osm_id` and `osm_type` from the `properties` object in `data`
      const { properties } = data;
      const { osm_id, osm_type } = properties;

      // Check if `osm_id` or `osm_type` is missing
      if (!osm_id || !osm_type) {
        return rejectWithValue('Invalid request parameters');
      }

      // Make a GET request to the `${api}/osm/photonDetails/${osm_type}/${osm_id}` endpoint
      // const response = await axios.get(
      //   `${api}/osm/photonDetails/${osm_type}/${osm_id}`,
      // );

      // // Return the response data
      // return response.data;
      return await trpc.getPhotonDetails.query({ id: osm_id, type: osm_type });
    } catch (err) {
      // Handle errors by returning the error response data using `rejectWithValue`
      return rejectWithValue(err.response.data);
    }
  },
);

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

  extraReducers: (builder) => {
    builder
      .addCase(processGeoJSON.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(processGeoJSON.fulfilled, (state, action) => {
        state.status = 'succeeded';
        destinationAdapter.upsertOne(
          state.currentDestination,
          action.payload.data.newInstance,
        );
      })
      .addCase(processGeoJSON.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDestination.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDestination.fulfilled, (state, action) => {
        state.status = 'succeeded';
        destinationAdapter.upsertOne(
          state.currentDestination,
          action.payload.data.destination,
        );
      })
      .addCase(getDestination.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(photonDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(photonDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.photonDetails = action.payload; // assign data directly to state field
      })
      .addCase(photonDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedSearchResult, setWeatherObject, setWeatherWeek } =
  destinationSlice.actions;
export default destinationSlice.reducer;
