import axios from 'axios';
import { api } from 'app/constants/api';
// import { store } from '../store/store';
import { toast } from 'app/utils/ToastUtils';
import { dispatchProgress, progressActions } from '../atoms/progressStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let activeRequests = new Map();

const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error("Couldn't fetch token from AsyncStorage:", error);
    return null;
  }
};

const generateRequestKey = (config) => `${config.method}-${config.url}`;

const requestInterceptor = async (config) => {
  config.baseURL = api;
  const token = await getTokenFromStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const requestKey = generateRequestKey(config);

  config.onUploadProgress = (progressEvent) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    activeRequests.set(requestKey, percentage);
    const aggregatedPercentage =
      Array.from(activeRequests.values()).reduce((acc, val) => acc + val, 0) /
      activeRequests.size;
    dispatchProgress(progressActions.setTargetProgress(aggregatedPercentage));
  };

  config.onDownloadProgress = (progressEvent) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    activeRequests.set(requestKey, percentage);
    const aggregatedPercentage =
      Array.from(activeRequests.values()).reduce((acc, val) => acc + val, 0) /
      activeRequests.size;
    dispatchProgress(progressActions.setTargetProgress(aggregatedPercentage));
  };

  return config;
};

const requestErrorInterceptor = (error) => {
  return Promise.reject(error.response ? error.request : error);
};

const responseInterceptor = (response) => {
  const requestKey = generateRequestKey(response.config);
  activeRequests.delete(requestKey);

  if (activeRequests.size === 0) {
    setTimeout(() => {
      dispatchProgress(progressActions.resetProgress());
    }, 3000);
  }

  const responseMessage = response.headers['x-response-message'];

  if (responseMessage) {
    toast({
      title: responseMessage,
      duration: 3,
      preset: response.status === 200 ? 'done' : 'error',
    });
  }

  return response;
};

// After receiving a response from the server, wait for a short time then reset the progress bar.
const responseInterceptor2 = (response) => {
  const responseMessage = response.headers['x-response-message'];

  if (responseMessage) {
    toast({
      title: responseMessage,
      duration: 3,
      preset: response.status === 200 ? 'done' : 'error',
    });
  }

  setTimeout(() => {
    dispatchProgress(progressActions.resetProgress());
  }, 3000); // Adjust as needed

  return response;
};

const responseErrorInterceptor = (error) => {
  const requestKey = generateRequestKey(error.config);
  activeRequests.delete(requestKey);

  if (activeRequests.size === 0) {
    setTimeout(() => {
      dispatchProgress(progressActions.resetProgress());
    }, 1500);
  }

  if ('code' in error && error.code === 'ERR_CANCELED')
    return Promise.reject(error);

  const errorMessage =
    'message' in error ? error.message : 'Something went wrong';

  toast({
    title: errorMessage,
    duration: 3,
    preset: 'error',
  });

  return Promise.reject(error);
};

const responseErrorInterceptor2 = (error) => {
  if ('code' in error && error.code === 'ERR_CANCELED') {
    return;
  }

  const errorMessage =
    'message' in error ? error.message : 'Something went wrong';
  toast({
    title: errorMessage,
    duration: 3,
    preset: 'error',
  });

  setTimeout(() => {
    dispatchProgress(progressActions.resetProgress());
  }, 1500); // Adjust as needed

  return Promise.reject(error);
};

axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
axios.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axios;
