import process from 'node:process';

export const MONGODB_URI = process.env.MONGODB_URI;

export const SERVICE_ACCOUNT_KEY = {
  type: process.env.SERVICE_ACCOUNT_KEY_TYPE,
  project_id: process.env.SERVICE_ACCOUNT_KEY_PROJECT_ID,
  private_key_id: process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY_ID,
  private_key: process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY,
  client_email: process.env.SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
  client_id: process.env.SERVICE_ACCOUNT_KEY_CLIENT_ID,
  auth_uri: process.env.SERVICE_ACCOUNT_KEY_AUTH_URI,
  token_uri: process.env.SERVICE_ACCOUNT_KEY_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.SERVICE_ACCOUNT_KEY_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.SERVICE_ACCOUNT_KEY_CLIENT_X509_CERT_URL,
};

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const STMP_EMAIL = process.env.STMP_EMAIL;
export const STMP_PASSWORD = process.env.STMP_PASSWORD;

export const CLIENT_URL = process.env.CLIENT_URL;

export const JWT_SECRET = process.env.JWT_SECRET;

export const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;

export const SERVER_ROOT_URI = process.env.SERVER_ROOT_URI;
export const UI_ROOT_URI = process.env.CLIENT_URL;

export const REDIRECT_URL = 'auth/google';

export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const CORS_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
