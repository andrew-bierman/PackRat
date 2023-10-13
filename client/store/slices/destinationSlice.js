import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  useProcessGeoJSONMutation,
  useGetDestinationQuery,
  usePhotonDetailsQuery,
} from 'store/customTrpc/customTRPCQueryHooks';

const destinationAdapter = createEntityAdapter();

const destinationSlice = createSlice({
  name: 'destination',
  initialState: destinationAdapter.getInitialState({
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
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedSearchResult: (state, action) => {
      state.selectedSearchResult = action.payload;
    },
    setWeatherObject: (state, action) => {
      state.weatherObject = action.payload;
    },
    setWeatherWeek: (state, action) => {
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
        const response = useProcessGeoJSONMutation(action.payload);
        if (response.error) {
          dispatch(processGeoJSON.rejected({ error: response.error }));
        } else {
          dispatch(processGeoJSON.fulfilled(response.data));
        }
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
        const response = useGetDestinationQuery(action.payload);
        if (response.error) {
          dispatch(getDestination.rejected({ error: response.error }));
        } else {
          dispatch(getDestination.fulfilled(response.data));
        }
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
        const response = usePhotonDetailsQuery(action.payload);
        if (response.error) {
          dispatch(photonDetails.rejected({ error: response.error }));
        } else {
          dispatch(photonDetails.fulfilled(response.data));
        }
      })
      .addCase(photonDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setData,
  setSelectedSearchResult,
  setWeatherObject,
  setWeatherWeek,
} = destinationSlice.actions;

export default destinationSlice.reducer;
