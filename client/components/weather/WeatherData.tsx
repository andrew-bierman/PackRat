import React from 'react';
import WeatherCard from './WeatherCard';
import { useFetchWeather, useFetchWeatherWeak } from '~/hooks/weather';
import { RText } from '@packrat/ui';

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} geoJSON - The GeoJSON data.
 * @return {JSX.Element|null} The WeatherCard component if weatherObject and weatherWeek are truthy, otherwise null.
 */
export const WeatherData = ({ geoJSON }) => {

  const { data: weatherObjectData } = useFetchWeather(geoJSON);
  const { data: weatherWeekData } = useFetchWeatherWeak(geoJSON);

  return weatherObjectData && weatherWeekData ? (
    <WeatherCard
      weatherObject={weatherObjectData}
      weatherWeek={weatherWeekData}
    />
  ) : <RText>No Weather Data</RText>;
};
