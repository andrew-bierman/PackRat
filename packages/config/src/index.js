/**
 * API URL taken from environment variables. It falls back through several environment variables depending on the runtime environment.
 * @type {string}
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.EXPO_PUBLIC_API_URL ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined);

/**
 * Google Client ID for OAuth purposes, taken from environment variables. It uses different environment variables based on the runtime environment.
 * @type {string}
 */
export const GOOGLE_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ID ||
  process.env.EXPO_PUBLIC_GOOGLE_ID ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GOOGLE_ID : undefined);

/**
 * iOS Client ID for authentication with services, typically used in OAuth flows, taken from different environment variables based on the runtime environment.
 * @type {string}
 */
export const IOS_CLIENT_ID =
  process.env.NEXT_PUBLIC_IOS_CLIENT_ID ||
  process.env.EXPO_PUBLIC_IOS_CLIENT_ID ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_IOS_CLIENT_ID : undefined);

/**
 * Android Client ID for authentication purposes, typically used in OAuth flows, taken from different environment variables based on the runtime environment.
 * @type {string}
 */
export const ANDROID_CLIENT_ID =
  process.env.NEXT_PUBLIC_ANDROID_CLIENT_ID ||
  process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_ANDROID_CLIENT_ID : undefined);

/**
 * Mapbox Access Token for using Mapbox APIs, fetched from environment variables, based on the runtime environment.
 * @type {string}
 */
export const MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN : undefined);

/**
 * Generic application configuration variable, potentially used for defining behavior across different environments, fetched from environment variables.
 * @type {string}
 */
export const APP =
  process.env.NEXT_PUBLIC_APP ||
  process.env.EXPO_PUBLIC_APP ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_APP : undefined);

/**
 * Client URL for the application, useful for OAuth redirects, API callbacks, etc., taken from environment variables.
 * @type {string}
 */
export const CLIENT_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  process.env.EXPO_PUBLIC_CLIENT_URL ||
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_CLIENT_URL : undefined);

/**
 * Node environment setting which is typically 'development' or 'production'. This can be used to toggle between different behaviors based on the deployment environment.
 * @type {string}
 */
export const NODE_ENV = process.env.NODE_ENV || 'development';