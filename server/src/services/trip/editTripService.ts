import * as validator from '@packrat/validations';
import { GeoJson } from '../../drizzle/methods/Geojson';
import { TripGeoJson } from '../../drizzle/methods/TripGeoJson';
import { Trip } from '../../drizzle/methods/trip';
import { GeojsonStorageService } from '../geojsonStorage';
import { scoreTripService } from './scoreTripService';

export const editTripService = async (
  tripData: validator.EditTripType,
  executionCtx: ExecutionContext,
) => {
  try {
    const tripClass = new Trip();
    const selectedTrip = await tripClass.findById(tripData.id);
    if (!selectedTrip) {
      throw new Error('Trip not found');
    }
    const updatedTrip = await tripClass.update({
      id: tripData?.id,
      name: tripData.name || selectedTrip.name,
      description: tripData.description || selectedTrip.description,
      destination: tripData.destination || selectedTrip.destination,
      start_date: tripData.start_date || selectedTrip.start_date,
      end_date: tripData.end_date || selectedTrip.end_date,
      activity: tripData.activity || selectedTrip.activity,
      is_public:
        typeof tripData.is_public === 'boolean'
          ? tripData.is_public
          : selectedTrip.is_public,
      pack_id: tripData.pack_id || selectedTrip.pack_id,
      trails: tripData.trails
        ? JSON.parse(tripData.trails)
        : selectedTrip.trails,
      parks: tripData.parks ? JSON.parse(tripData.parks) : selectedTrip.parks,
      bounds: tripData.bounds
        ? [tripData.bounds[0], tripData.bounds[1]]
        : selectedTrip.bounds,
    });

    await scoreTripService(selectedTrip.id);

    const serializedGeoJSON = tripData.geoJSON;

    if (!serializedGeoJSON) {
      return updatedTrip;
    }

    const geojsonClass = new GeoJson();

    const tripGeoJSONs = selectedTrip.tripGeojsons;
    if (tripGeoJSONs && tripGeoJSONs.length > 0 && tripGeoJSONs[0]?.geojson) {
      await geojsonClass.update(tripGeoJSONs[0].geojson.id, {
        geoJSON: serializedGeoJSON,
      });
    } else {
      const insertedGeoJson = await geojsonClass.create({
        geoJSON: serializedGeoJSON,
      });

      const tripGeoJsonClass = new TripGeoJson();
      await tripGeoJsonClass.create({
        tripId: selectedTrip.id,
        geojsonId: insertedGeoJson.id,
      });
    }

    executionCtx.waitUntil(
      GeojsonStorageService.save('trip', serializedGeoJSON, selectedTrip.id),
    );

    return updatedTrip;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add trip and GeoJSON data');
  }
};

export const setTripVisibilityService = async (
  tripData: validator.SetTripVisibilityType,
) => {
  try {
    const tripClass = new Trip();
    const selectedTrip = await tripClass.findById(tripData.tripId);
    if (!selectedTrip) {
      throw new Error('Trip not found');
    }
    const updatedTrip = await tripClass.update({
      id: selectedTrip.id,
      name: selectedTrip.name,
      start_date: selectedTrip.start_date,
      end_date: selectedTrip.end_date,
      destination: selectedTrip.destination,
      is_public: tripData.is_public,
    });
    return updatedTrip;
  } catch (error) {
    console.error(error);
    throw new Error('Unable to add trip and GeoJSON data');
  }
};
