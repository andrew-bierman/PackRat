import { Middleware } from '@reduxjs/toolkit';

const getTokenFromState = (state: any): string | null => {
    // Adjust this path depending on where the token is in your state
    return state.auth.user.token || null;
};

const bearerTokenMiddleware: Middleware = (api) => (next) => (action) => {
    if (action.type.includes('auth')) {
        return next(action);
    }

    if (action.type.endsWith('/pending')) {
        const token = getTokenFromState(api.getState());

        if (token) {
            action.meta.request.headers = {
                ...action.meta.request.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    }

    return next(action);
};

export default bearerTokenMiddleware;
