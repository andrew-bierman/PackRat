import { viteSource } from './sources/vite';

/**
 * Retrieves environment variables based on the platform and variable names.
 * Ensures compatibility with Expo's static analysis for environment variables.
 */

// Simplifying environment variable access using logical OR
const API_URL =
  viteSource.VITE_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_API_URL;
const WEB_CLIENT_ID =
  viteSource.VITE_PUBLIC_WEB_CLIENT_ID ||
  process.env.NEXT_PUBLIC_WEB_CLIENT_ID ||
  process.env.EXPO_PUBLIC_WEB_CLIENT_ID;
const IOS_CLIENT_ID =
  viteSource.VITE_PUBLIC_IOS_CLIENT_ID ||
  process.env.NEXT_PUBLIC_IOS_CLIENT_ID ||
  process.env.EXPO_PUBLIC_IOS_CLIENT_ID;
const ANDROID_CLIENT_ID =
  viteSource.VITE_PUBLIC_ANDROID_CLIENT_ID ||
  process.env.NEXT_PUBLIC_ANDROID_CLIENT_ID ||
  process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID;
const MAPBOX_ACCESS_TOKEN =
  viteSource.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN;
const APP =
  viteSource.VITE_PUBLIC_APP ||
  process.env.NEXT_PUBLIC_APP ||
  process.env.EXPO_PUBLIC_APP;
const CLIENT_URL =
  viteSource.VITE_PUBLIC_CLIENT_URL ||
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  process.env.EXPO_PUBLIC_CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;

export {
  API_URL,
  WEB_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  MAPBOX_ACCESS_TOKEN,
  APP,
  CLIENT_URL,
  NODE_ENV,
};
