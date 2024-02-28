import React, { useMemo } from 'react';
import WeatherCard from './WeatherCard';
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';
import { RText } from '@packrat/ui';
import { parseCoordinates } from 'app/utils/coordinatesParser';

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} geoJSON - The GeoJSON data.
 * @return {JSX.Element|null} The WeatherCard component if weatherObject and weatherWeek are truthy, otherwise null.
 */
export const WeatherData = (geoJSON: any): JSX.Element => {
  const latLng = useMemo(() => {
    return parseCoordinates(geoJSON);
  }, [geoJSON]);

  const { data: weatherObjectData } = useFetchWeather(latLng);
  const { data: weatherWeekData } = useFetchWeatherWeak(latLng);

  return weatherObjectData && weatherWeekData ? (
    <WeatherCard
      weatherObject={weatherObjectData}
      weatherWeek={weatherWeekData}
    />
  ) : (
    <RText>No Weather Data</RText>
  );
};
