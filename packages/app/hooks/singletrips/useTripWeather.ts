import { useMemo } from 'react';
import { parseCoordinates } from 'app/utils/coordinatesParser';
import { useFetchWeather, useFetchWeatherWeak } from 'app/hooks/weather';

export const useTripWeather = (tripData) => {
  const tripWeather = useMemo(() => {
    try {
      return tripData?.weather ? JSON?.parse(tripData?.weather) : undefined;
    } catch {
      return;
    }
  }, [tripData]);

  const latLng = useMemo(() => {
    try {
      const geoJSON = tripData.geojson;

      if (geoJSON) {
        return parseCoordinates(geoJSON);
      }
    } catch {
      return {};
    }
  }, [tripData, tripWeather]);

  const { data: weatherObjectData } = useFetchWeather(latLng, !!tripWeather);
  const { data: weatherWeek } = useFetchWeatherWeak(latLng);

  return { weatherObject: tripWeather || weatherObjectData, weatherWeek };
};
