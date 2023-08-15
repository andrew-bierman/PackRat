import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { api } from "~/constants/api";

Axios.interceptors.request.use(
  (config) => {
    config.baseURL = api;
    return config;
  },
  (error) => {
    return Promise.reject(error.response ? error.request : error);
  }
);

Axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if ("code" in error) {
      if (error.code === "ERR_CANCELED") {
        return;
      }
    }

    if ("message" in error) {
      showMessage({
        message: error.message,
        type: "danger",
      });
    } else {
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }

    return Promise.reject(error);
  }
);

const axios = Axios;
export default axios;
