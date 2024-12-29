import { describe, it, expect, beforeAll } from 'vitest';
import { setupTest } from '../utils/testHelpers';
import type { trpcCaller } from '../utils/testHelpers';
import { env } from 'cloudflare:test';

describe('Get weather information', () => {
  let caller: trpcCaller;

  beforeAll(async () => {
    caller = await setupTest(env);
  });

  it('Get weather information', async () => {
    const coordinates = {
      lat: 20.5937,
      lon: 78.9629,
    };

    const weather = await caller.getWeather(coordinates);
    expect(weather).toBeDefined();
    expect(weather?.coord?.lon).toEqual(coordinates?.lon);
    expect(weather?.coord?.lat).toEqual(coordinates?.lat);
  });

  it('Get weekly weather information', async () => {
    const coordinates = {
      lat: 20.5937,
      lon: 78.9629,
    };
    const weather = await caller.getWeather(coordinates);
    expect(weather).toBeDefined();
    expect(weather?.coord?.lon).toEqual(coordinates?.lon);
    expect(weather?.coord?.lat).toEqual(coordinates?.lat);
  });
});
