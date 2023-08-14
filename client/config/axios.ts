// @todo use relay instead of gql client
import Axios from "axios";
import { showMessage } from "react-native-flash-message";
import { api } from "~/constants/api";

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

// Axios.interceptors.request.use(async (req) => {
//   req.headers = { ...baseHeaders, ...req.headers };
//   return req;
// });

// Axios.interceptors.response.use(async (res) => {
//     console.info('FILTERING LOGGER ----- res  ------  ',res);
//   if (res.data.errors && res.data.errors.length > 0) {
//     showMessage({
//       message: "Network Error",
//       type: "danger",
//     });
//   }
//   return res;
// });

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
    console.info(
      "FILTERING LOGGER ----- AXIOS MAIN RESPONSE  ------  ",
      response
    );
    return response;
  },
  async (error) => {
    console.info("FILTERING LOGGER ----- AXIOS MAIN ERROR   ------  ", error);
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
