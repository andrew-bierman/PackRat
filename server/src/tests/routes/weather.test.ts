import { createCaller } from '../../routes/trpcRouter';
import { createTestCallerContext } from '../../trpc';

const caller = createCaller(createTestCallerContext());

describe('Get weather information', () => {
  test('Get weather information', async () => {
    const coordinates = {
      lat: 20.5937,
      lon: 78.9629,
    };
    const weather = await caller.getWeather(coordinates);

    expect(weather).toBeDefined();
    expect(weather?.coord?.lon).toEqual(coordinates?.lon);
    expect(weather?.coord?.lat).toEqual(coordinates?.lat);
  });

  test('Get weekly weather information', async () => {
    const coordinates = {
      lat: 20.5937,
      lon: 78.9629,
    };
    const weather = await caller.getWeatherWeek(coordinates);

    expect(weather).toBeDefined();
    expect(weather?.coord?.lon).toEqual(coordinates?.lon);
    expect(weather?.coord?.lat).toEqual(coordinates?.lat);
  });
});
