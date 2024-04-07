import axios, { AxiosResponse } from 'axios';
import { InformUser } from 'app/utils/ToastUtils';
import { getErrorMessageFromError } from 'app/utils/apiUtils';

const axiosInstance = axios.create();

const responseInterceptor = (response: AxiosResponse) => response;

const responseErrorInterceptor = (response: AxiosResponse) => {
  const responseMessage = getErrorMessageFromError(response);
  console.log(response.config.url);

  if (responseMessage && !response.config.url.includes('getMe')) {
    InformUser({
      title: responseMessage,
      placement: 'bottom',
      duration: 3000,
      style: { backgroundColor: response.status === 200 ? 'green' : 'red' },
    });
  }

  return response;
};

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export default axiosInstance;
