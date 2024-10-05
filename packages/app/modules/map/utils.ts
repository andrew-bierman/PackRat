import { api } from 'app/constants/api';
import { type Shape } from './model';
import * as bounds from 'geojson-bounds';

export const getBoundingBoxFromShape = (shape: Shape) => {
  if (!shape) return undefined;
  return bounds.extent(shape);
};

export const isShapeDownloadable = (shape: Shape) => {
  return shape?.features[0]?.geometry?.coordinates?.length >= 1;
};

export const getMapGEOURI = (mapId: string) => `${api}/geojson/map/${mapId}`;
