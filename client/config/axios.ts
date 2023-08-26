import axios from 'axios';
import { api } from '~/constants/api';
import { store } from '../store/store';
// import { showMessage } from "react-native-flash-message";

// Helper function to get the token
const getTokenFromState = () => {
  const state = store.getState();
  //   @ts-ignore
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

// const responseErrorInterceptor = (error) => {
//     if ("code" in error && error.code === "ERR_CANCELED") {
//         return;
//     }

//     const errorMessage = "message" in error ? error.message : "Something went wrong";
//     showMessage({
//         message: errorMessage,
//         type: "danger",
//     });

//     return Promise.reject(error);
// };

axios.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
// axios.interceptors.response.use(undefined, responseErrorInterceptor);

export default axios;
