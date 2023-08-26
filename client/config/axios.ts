import axios from 'axios';
import { api } from '~/constants/api';
import { store } from '../store/store';
import { InformUser } from '~/utils/ToastUtils';

// Helper function to get the token
const getTokenFromState = () => {
  const state = store.getState();
  // @ts-ignore
  return state?.auth?.user?.token || null;
};

const requestInterceptor = (config) => {
  config.baseURL = api;

  const token = getTokenFromState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const requestErrorInterceptor = (error) => {
  return Promise.reject(error.response ? error.request : error);
};

const responseInterceptor = (response) => {
  // Check for the custom header
  const responseMessage = response.headers['x-response-message'];

  if (responseMessage) {
    InformUser({
      title: responseMessage,
      placement: 'bottom',
      duration: 3000,
      style: { backgroundColor: response.status === 200 ? 'green' : 'red' },
    });
  }

  return response;
};

const responseErrorInterceptor = (error) => {
  if ('code' in error && error.code === 'ERR_CANCELED') {
    return;
  }

  const errorMessage =
    'message' in error ? error.message : 'Something went wrong';
  InformUser({
    title: errorMessage,
    placement: 'bottom',
    duration: 3000,
    style: { backgroundColor: 'red' },
  });

  return Promise.reject(error);
};

axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axios.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axios;
