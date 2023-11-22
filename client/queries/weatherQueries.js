// weatherQueries.js
import { useQuery } from 'react-query';

export function useWeatherData(lat, lon) {
  return useQuery(['weather', lat, lon], async () => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    return response.json();
  });
}
