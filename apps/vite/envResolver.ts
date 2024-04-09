export const NODE_ENV = process.env.NODE_ENV || 'development';
export const API_URL = process.env.API_URL || 'http://localhost:3000/api';
export const NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default {
  NODE_ENV,
  API_URL,
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  MAPBOX_ACCESS_TOKEN,
  CLIENT_URL,
  NEXT_PUBLIC_API_URL,
};
