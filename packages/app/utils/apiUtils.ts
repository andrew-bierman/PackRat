import { AxiosError } from 'axios';

export const getErrorMessageFromError = (e: unknown) => {
  const defaultErrorMessage = 'Failure: Please contact to support';

  if (!(e instanceof AxiosError)) {
    return defaultErrorMessage;
  }

  const responseData = e.response?.data;

  return (
    responseData?.[0]?.error?.message ||
    responseData?.error?.message ||
    defaultErrorMessage
  );
};
