// slices/weather/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from '../../../constants/api';

export const weatherApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: ({ lat, lon }) => `/weather?lat=${lat}&lon=${lon}`,
    }),
    getWeatherWeek: builder.query({
      query: ({ lat, lon }) => `/weather/week?lat=${lat}&lon=${lon}`,
    }),
  }),
});

export const { useGetWeatherQuery, useGetWeatherWeekQuery } = weatherApi;
