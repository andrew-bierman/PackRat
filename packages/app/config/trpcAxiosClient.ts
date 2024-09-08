import axios, { AxiosError, AxiosResponse } from 'axios';
import { InformUser } from 'app/utils/ToastUtils';
import { logoutAuthUser } from 'app/utils/userUtils';
import { getErrorMessageFromError } from 'app/utils/apiUtils';
import { Storage } from 'app/utils/storage';
import { vanillaTrpcClient } from 'app/trpc';
import { TRPCErrorResponse } from '@trpc/server/rpc';
import { TRPCClientError } from '@trpc/client';

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

const responseErrorInterceptor = async (
  error: AxiosError<TRPCErrorResponse>,
) => {
  const data = error?.response?.data;
  const isUnauthorized = (item) => item?.error?.data?.httpStatus === 401;
  // check auth error in both single or multiple objects response
  const hasUnauthorizedError = Array.isArray(data)
    ? data.some(isUnauthorized)
    : isUnauthorized(data);

  if (data && hasUnauthorizedError) {
    const refreshToken = await Storage.getItem('refreshToken');

    if (!refreshToken) return; // user is logged out if refreshToken isn't present

    // maybe token expired? try refreshing.
    try {
      const tokens = await vanillaTrpcClient.refreshToken.query(refreshToken);
      await Storage.setItem('token', tokens.accessToken);
      await Storage.setItem('refreshToken', tokens.refreshToken);

      // rety request
      error.config.headers.Authorization = 'Bearer ' + tokens.accessToken;
      return await axios.request(error.config);
    } catch (error) {
      // refreshToken has also expired. Logout user.
      if (error instanceof TRPCClientError && error.data.code == 'UNAUTHORIZED')
        logoutAuthUser();
      return error;
    }
  }

  if (
    error.config.method === 'get' ||
    REQUESTS_TO_SKIP_ERROR_MESSAGE.some((url) =>
      error.config.url?.includes?.(url),
    )
  ) {
    return error;
  }

  const responseMessage = getErrorMessageFromError(error);

  if (responseMessage) {
    InformUser({
      title: responseMessage,
      placement: 'bottom',
      duration: 3000,
      style: { backgroundColor: 'red' },
    });
  }

  return error;
};

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export default axiosInstance;
