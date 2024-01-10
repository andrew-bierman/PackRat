import mongoose from 'mongoose';
import { createCaller } from '../../routes/trpcRouter';

beforeEach(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  await mongoose.disconnect();
});

const caller = createCaller({});

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
    expect(weather?.city?.coord?.lon).toEqual(coordinates?.lon);
    expect(weather?.city?.coord?.lat).toEqual(coordinates?.lat);
  });
});
