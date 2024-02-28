import { Types } from 'mongoose';

export enum GeojsonENUM {
  Point = 'Point',
  LineString = 'LineString',
  Polygon = 'Polygon',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  MultiLineString = 'MultiLineString',
}

export type GeojsonType = {
  type: string;
  id: string;
  properties: Object;
  geometry: {
    type: GeojsonENUM;
    coordinates: any; // from mongoose.Schema.Types.Mixed
  };
};
