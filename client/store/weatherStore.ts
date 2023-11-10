import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { defaultWeatherObject } from '../constants/defaultWeatherObj';
import { defaultWeekObj } from '../constants/defaultWeekObj';

import { api } from '../constants/api';
import { trpc } from '../trpc';

const weatherAdapter = createEntityAdapter();

const initialState = weatherAdapter.getInitialState({
  weatherObject: defaultWeatherObject,
  weatherWeek: defaultWeekObj,
});

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ lat, lon, state }) => {
    let params = '?';

    if (lat) params += `lat=${lat}`;
    if (lon) params += `&lon=${lon}`;

    const url = api + '/weather' + params;

    try {
      // const response = await axios.get(url);
      // // console.log('response', response)
      // return response.data;
      return await trpc.getWeather.query({ lat, lon });
    } catch (error) {
      console.error('error:' + error);
    }
  },
);

export const fetchWeatherWeek = createAsyncThunk(
  'weather/fetchWeatherWeek',
  async ({ lat, lon }) => {
    let params = '?';

    if (lat) params += `lat=${lat}`;
    if (lon) params += `&lon=${lon}`;

    const url = api + '/weather/week' + params;

    try {
      // const response = await axios.get(url);
      // // console.log('response', response)
      // return response.data;
      return await trpc.getWeatherWeek.query({ lat, lon });
    } catch (error) {
      console.error('error:' + error);
    }
  },
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.weatherObject = action.payload;
    },
    addWeek: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.weatherWeek = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherObject = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchWeatherWeek.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeatherWeek.fulfilled, (state, action) => {
        const week = action.payload.list.slice(0, 4);
        state.weatherWeek = week;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchWeatherWeek.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { add, addWeek } = weatherSlice.actions;

export const { selectAll: selectAllWeathers, selectById: selectWeatherById } =
  weatherAdapter.getSelectors((state) => state.weather);

export const selectIsLoading = (state) => state.weather.isLoading;
export const selectError = (state) => state.weather.error;

export default weatherSlice.reducer;
