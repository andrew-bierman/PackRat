// require('dotenv').config();
import { config } from 'dotenv';

config();

export const MONGODB_URI = process.env.MONGODB_URI

export const SERVICE_ACCOUNT_KEY = {
    "type": process.env.SERVICE_ACCOUNT_KEY_TYPE,
    "project_id": process.env.SERVICE_ACCOUNT_KEY_PROJECT_ID,
    "private_key_id": process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY_ID,
    "private_key": process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY,
    "client_email": process.env.SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
    "client_id": process.env.SERVICE_ACCOUNT_KEY_CLIENT_ID,
    "auth_uri": process.env.SERVICE_ACCOUNT_KEY_AUTH_URI,
    "token_uri": process.env.SERVICE_ACCOUNT_KEY_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.SERVICE_ACCOUNT_KEY_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.SERVICE_ACCOUNT_KEY_CLIENT_X509_CERT_URL
}