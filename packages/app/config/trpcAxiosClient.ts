import axios, { AxiosResponse } from 'axios';
import { toast } from 'app/utils/ToastUtils';
import { logoutAuthUser } from 'app/utils/userUtils';
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

  toast({
    title: 'Confirmed! Your submission was successful.',
    duration: 3,
    preset: 'done',
  });

  return response;
};

const responseErrorInterceptor = (response: AxiosResponse) => {
  if (response?.response?.data?.error?.data?.httpStatus === 401) {
    logoutAuthUser();
  }

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
    toast({
      title: responseMessage,
      duration: 3,
      preset: 'error',
    });
  }

  return response;
};

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export default axiosInstance;
