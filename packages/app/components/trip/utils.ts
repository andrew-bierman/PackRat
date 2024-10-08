import { api } from 'app/constants/api';

export const getTripGEOURI = (tripId: string) =>
  `${api}/geojson/trip/${tripId}`;
