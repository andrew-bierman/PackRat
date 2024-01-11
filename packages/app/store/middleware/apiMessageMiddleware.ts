import { type Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { InformUser } from 'app/utils/ToastUtils';
import { api } from 'app/constants/api';

const apiMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    console.log('action: ', action);

    if (action.type.endsWith('/pending')) {
      try {
        const result = await next(action);
        return result;
      } catch (error) {
        if ('code' in error && error.code === 'ERR_CANCELED') {
          return;
        }

        let title = 'Something went wrong';
        if ('message' in error) {
          title = error.message;
        }

        InformUser({
          title,
          placement: 'top',
          duration: 3000,
          style: { backgroundColor: 'red' }, // Style for error messages
        });

        console.error('ERROR: ', error);
        console.error(error);

        // Optionally, dispatch another action here if you want to handle the error globally
        // dispatch(someErrorAction(title));
        return await Promise.reject(error);
      }
    } else if (action.type.endsWith('/fulfilled')) {
      const { payload } = action;

      if (payload && (payload.message || payload.msg)) {
        InformUser({
          title: payload.message || payload.msg,
          placement: 'bottom',
          duration: 3000,
          style: { backgroundColor: 'green' }, // Style for success messages
        });
      }
    } else if (action.type.endsWith('/rejected')) {
      const { error, payload } = action;
      if (error && (error.message || error.msg)) {
        InformUser({
          title: error.message || error.msg,
          placement: 'bottom',
          duration: 3000,
          style: { backgroundColor: 'red' }, // Style for error messages
        });
      } else if (payload && (payload.message || payload.msg)) {
        InformUser({
          title: payload.message || payload.msg,
          placement: 'bottom',
          duration: 3000,
          style: { backgroundColor: 'red' }, // Style for error messages
        });
      } else {
        InformUser({
          title: 'Something went wrong',
          placement: 'bottom',
          duration: 3000,
          style: { backgroundColor: 'red' }, // Style for generic error messages
        });
      }
      console.error('ERROR: ', error);
    }

    return next(action);
  };

export default apiMiddleware;
