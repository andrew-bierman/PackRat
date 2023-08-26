export const defaultWeatherObject = {
  base: 'stations',
  clouds: {
    all: 100,
  },
  cod: 200,
  coord: { lon: -77.4343, lat: 37.5385 },
  dt: 1664850312,
  id: 6254928,
  main: {
    feels_like: 42.6,
    humidity: 89,
    pressure: 1022,
    temp: 48.61,
    temp_max: 50.65,
    temp_min: 47.19,
  },

  name: 'Virginia',

  sys: {
    country: 'US',
    id: 2007417,
    sunrise: 1664795210,
    sunset: 1664837428,
    type: 2,
  },

  timezone: -14400,
  visibility: 10000,
  weather: [
    {
      description: 'overcast clouds',
      icon: '04n',
      id: 804,
      main: 'Clouds',
    },
  ],
  wind: {
    speed: 16.11,
    deg: 360,
    gust: 23.02,
  },
};
