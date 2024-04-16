import axios, { AxiosResponse } from 'axios';
import { InformUser } from 'app/utils/ToastUtils';
import { getErrorMessageFromError } from 'app/utils/apiUtils';

const REQUESTS_TO_SKIP_SUCCESS_MESSAGE = [
  'getMe',
  'signUp',
  'signIn',
  'resetPasswordEmail',
  'resetPassword',
];

const REQUESTS_TO_SKIP_ERROR_MESSAGE = ['getMe'];

const axiosInstance = axios.create();

const responseInterceptor = (response: AxiosResponse) => {
  if (
    response.config.method === 'get' ||
    REQUESTS_TO_SKIP_SUCCESS_MESSAGE.some((url) =>
      response.config.url?.includes?.(url),
    )
  ) {
    return response;
  }

  InformUser({
    title: 'Confirmed! Your submission was successful.',
    placement: 'bottom',
    duration: 3000,
    style: { backgroundColor: 'green' },
  });

  return response;
};

const responseErrorInterceptor = (response: AxiosResponse) => {
  if (
    response.config.method === 'get' ||
    REQUESTS_TO_SKIP_ERROR_MESSAGE.some((url) =>
      response.config.url?.includes?.(url),
    )
  ) {
    return response;
  }

  const responseMessage = getErrorMessageFromError(response);

  if (responseMessage) {
    InformUser({
      title: responseMessage,
      placement: 'bottom',
      duration: 3000,
      style: { backgroundColor: 'red' },
    });
  }

  return response;
};

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export default axiosInstance;
