import { type Shape } from './model';
import * as bounds from 'geojson-bounds';

export const getBoundingBoxFromShape = (shape: Shape) => {
  return bounds.extent(shape);
};

export const isShapeDownloadable = (shape: Shape) => {
  return shape?.features[0]?.geometry?.coordinates?.length >= 1;
};
