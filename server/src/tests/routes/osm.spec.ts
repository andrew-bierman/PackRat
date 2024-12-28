import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { setupTest } from '../testHelpers';
import type { trpcCaller } from '../testHelpers';
import { env } from 'cloudflare:test';
import { Node as NodeClass } from '../../drizzle/methods/Node';

interface GeojsonType {
  type: string;
  properties: Object;
  geometry: {
    type: 'Point';
    coordinates: any; // from mongoose.Schema.Types.Mixed
  };
}

describe('OSM routes', () => {
  let caller: trpcCaller;
  const nodeClass = new NodeClass();

  beforeAll(async () => {
    caller = await setupTest(env);
  });

  describe('getPhotonResults', () => {
    it(
      'should get photon results based on search string',
      {
        timeout: 10000,
      },
      async () => {
        const results = await caller.getPhotonResults({
          searchString: 'test',
        });
        expect(results).toBeDefined();
      },
    );
  });

  describe('getTrailsOSM', () => {
    it(
      'should get trails',
      {
        timeout: 10000,
      },
      async () => {
        const results = await caller.getTrailsOSM({
          lat: 20.5937,
          lon: 78.9629,
        });
        expect(results).toBeDefined();
      },
    );
  });

  describe('getParksOSM', () => {
    it(
      'should get parks',
      {
        timeout: 10000,
      },
      async () => {
        const results = await caller.getParksOSM({
          lat: 20.5937,
          lon: 78.9629,
        });
        expect(results).toBeDefined();
      },
    );
  });

  describe('getOsm', () => {
    it(
      'should get Osm routes based on start and end points',
      {
        timeout: 10000,
      },
      async () => {
        const results = await caller.getOsm({
          activityType: 'hiking',
          startPoint: {
            latitude: 20.5937,
            longitude: 78.9629,
          },
          endPoint: {
            latitude: 20.5937,
            longitude: 78.9629,
          },
        });
        expect(results).toBeDefined();
      },
    );
  });

  describe('postSingleGeoJSON', () => {
    it(
      'should post geojson',
      {
        timeout: 10000,
      },
      async () => {
        const geojson: GeojsonType = {
          properties: {
            osm_id: 1,
            osm_type: 'node',
          },
          type: 'Feature',
          geometry: {
            coordinates: [],
            type: 'Point',
          },
        };
        const results = await caller.postSingleGeoJSON({
          geojson,
        });
        expect(results).toBeDefined();
      },
    );
  });

  describe('getDestination', () => {
    it(
      'should get destination route',
      {
        timeout: 10000,
      },
      async () => {
        const node = await nodeClass.create({
          osm_id: 2311693,
          lat: 22.231897,
          lon: 60.435018,
          tags: '{}',
        });
        const results = await caller.getDestination({ id: node.id });
        expect(results).toBeDefined();
      },
    );
  });

  describe('getPhotonDetails', () => {
    it(
      'should get photon details',
      {
        timeout: 10000,
      },
      async () => {
        const node = await nodeClass.create({
          osm_id: 2311693,
          lat: 22.231897,
          lon: 60.435018,
          tags: '{}',
        });
        const results = await caller.getPhotonDetails({
          id: node.id,
          type: 'node',
        });
        expect(results).toBeDefined();
      },
    );
  });
});
