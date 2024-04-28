export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  import.meta.env.VITE_API_URL;

export const GOOGLE_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ID ||
  process.env.EXPO_PUBLIC_GOOGLE_ID ||
  import.meta.env.VITE_GOOGLE_ID;

export const MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const APP =
  process.env.NEXT_PUBLIC_APP ||
  process.env.EXPO_PUBLIC_APP ||
  import.meta.env.VITE_APP;

export const CLIENT_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  process.env.EXPO_PUBLIC_CLIENT_URL ||
  import.meta.env.VITE_CLIENT_URL;

export const NODE_ENV = process.env.NODE_ENV || 'development';
