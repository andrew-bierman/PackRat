import { Middleware } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { api } from '~/constants/api';

const apiMiddleware: Middleware = ({ dispatch }) => next => async action => {
    console.log('action: ', action);

    if (action.type.endsWith('/pending')) {
        try {
            const result = await next(action);
            return result;
        } catch (error) {
            if ("code" in error && error.code === "ERR_CANCELED") {
                return;
            }
            
            let message = "Something went wrong";
            if ("message" in error) {
                message = error.message;
            }
            
            showMessage({
                message,
                type: "danger",
            });

            console.error('ERROR: ', error);
            console.error(error);
    
            // Optionally, dispatch another action here if you want to handle the error globally
            // dispatch(someErrorAction(message));
            return Promise.reject(error);
        }
    } else if (action.type.endsWith('/fulfilled')) {
        const { payload } = action;
        if (payload && payload.message) {
            showMessage({
                message: payload.message,
                type: "success",
            });
        }
    } else if (action.type.endsWith('/rejected')) {
        const { payload } = action;
        if (payload && payload.message) {
            showMessage({
                message: payload.message,
                type: "danger",
            });
        }
        console.error('ERROR: ', payload);
    }

    return next(action);
};

export default apiMiddleware;
