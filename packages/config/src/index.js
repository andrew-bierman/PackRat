import { Platform } from 'react-native';
import { viteSource } from './sources/vite';

/**
 * @typedef {Object} EnvSource
 * @property {string} prefix - The prefix used for environment variables in this source.
 * @property {Object} source - The environment object (e.g., process.env or import.meta.env).
 */

/**
 * Array of environment sources with their prefixes and corresponding environment objects.
 * @type {EnvSource[]}
 */
const envSources = [
  {
    prefix: 'NEXT_PUBLIC_',
    source: process.env,
  },
  {
    prefix: 'EXPO_PUBLIC_',
    source: process.env,
  },
  // Hacky way to prevent expo from crashing when running build due to import.meta.env not being supported
  Platform.OS === 'web' ? viteSource : null,
];

/**
 * Array of base names for the environment variables to retrieve.
 * @type {string[]}
 */
const envMappings = [
  'API_URL',
  'GOOGLE_ID',
  'IOS_CLIENT_ID',
  'ANDROID_CLIENT_ID',
  'MAPBOX_ACCESS_TOKEN',
  'APP',
  'CLIENT_URL',
];

/**
 * Retrieves the value of an environment variable based on the provided key and environment sources.
 * @param {string} key - The base name of the environment variable.
 * @returns {string|undefined} - The value of the environment variable, or undefined if not found.
 */
function getEnvValue(key) {
  for (const { prefix, source } of envSources) {
    if (source) {
      const envKey = prefix + key;
      if (source[envKey]) {
        return source[envKey];
      }
    }
  }
  return undefined;
}

/**
 * Object containing the retrieved environment variable values.
 * @type {Object}
 */
const envConfig = envMappings.reduce((config, key) => {
  config[key] = getEnvValue(key);
  return config;
}, {});

envConfig.NODE_ENV = process.env.NODE_ENV;

export const {
  API_URL,
  GOOGLE_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  MAPBOX_ACCESS_TOKEN,
  APP,
  CLIENT_URL,
  NODE_ENV,
} = envConfig;

/**
 * Example output:
 * {
 *   API_URL: 'https://api.example.com',
 *   GOOGLE_ID: 'abc123',
 *   IOS_CLIENT_ID: 'def456',
 *   ANDROID_CLIENT_ID: 'ghi789',
 *   MAPBOX_ACCESS_TOKEN: 'xyz123',
 *   APP: 'my-app',
 *   CLIENT_URL: 'https://example.com',
 *   NODE_ENV: 'production'
 * }
 */
