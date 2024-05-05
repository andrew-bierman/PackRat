import Constants from 'expo-constants';

const NODE_ENV = Constants.expoConfig.extra.NODE_ENV;
const CLIENT_URL = Constants.expoConfig.extra.CLIENT_URL;
const MAPBOX_ACCESS_TOKEN = Constants.expoConfig.extra.MAPBOX_ACCESS_TOKEN;
const API_URL = Constants.expoConfig.extra.API_URL;


export {
  NODE_ENV,
  CLIENT_URL,
  MAPBOX_ACCESS_TOKEN,
  API_URL,
}
