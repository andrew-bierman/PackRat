import React, { useMemo } from 'react';
import WeatherCard from './WeatherCard';
import { useFetchWeather } from 'app/hooks/weather';

interface WeatherDataProps {
  latLng?: { lat: number; lon: number };
  fallback?: JSX.Element;
}

export const WeatherData = ({
  latLng,
  fallback = <></>,
}: WeatherDataProps): JSX.Element => {
  const { weatherToday, weatherWeek, location } = useFetchWeather(latLng);

  return weatherToday && weatherWeek ? (
    <WeatherCard
      weatherToday={weatherToday}
      weatherWeek={weatherWeek}
      location={location}
    />
  ) : (
    fallback
  );
};
