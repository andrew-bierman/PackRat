import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';
import { useFetchWeather, useFetchWeatherWeak } from '~/hooks/weather';

/**
 * Generates a function comment for the given function body.
 *
 * @param {Object} geoJSON - The GeoJSON data.
 * @return {JSX.Element|null} The WeatherCard component if weatherObject and weatherWeek are truthy, otherwise null.
 */
export const WeatherData = ({ geoJSON }) => {
  // const weatherObject = useSelector((state) => state.destination.weatherObject);
  // const weatherWeek = useSelector((state) => state.destination.weatherWeek);
  const [latLng, setLatLng] = useState({});
  const { data: weatherObjectData } = useFetchWeather(latLng);
  const { data: weatherWeekData } = useFetchWeatherWeak(latLng);

  useEffect(() => {
    /**
     * Fetches weather data based on the provided geoJSON.
     *
     * @return {Promise<void>} - A Promise that resolves when the weather data is fetched and stored.
     */
    const fetchWeatherData = async () => {
      if (geoJSON?.features) {
        const { coordinates } = geoJSON.features[0].geometry;

        // const [lon, lat] = coordinates;
        let lon, lat;

        if (coordinates[0] && Array.isArray(coordinates[0])) {
          [lon, lat] = coordinates[0];
        } else {
          [lon, lat] = coordinates;
        }

        if (lat && lon) {
          setLatLng({ lat, lon });
          try {
            // console.log(lat, lon)
            // const weatherObjRes = await dispatch(fetchWeather({ lat, lon }));
            // const weatherWkRes = await dispatch(fetchWeatherWeek({ lat, lon }));
            // dispatch(setWeatherObject(weatherObjRes.payload));
            // dispatch(setWeatherWeek(weatherWkRes.payload.list.slice(0, 4)));
          } catch (err) {
            console.error(err);
          }
        }
      }
    };
    fetchWeatherData();
  }, [geoJSON]);

  return weatherObjectData && weatherWeekData ? (
    <WeatherCard
      weatherObject={weatherObjectData}
      weatherWeek={weatherWeekData}
    />
  ) : null;
};
