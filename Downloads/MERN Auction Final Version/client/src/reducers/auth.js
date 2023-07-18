import {
  LOGIN_SUCCESS,
  USER_LOADING_ERROR,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGOUT
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, token: payload, loading: false };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case USER_LOADING_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: 'AUTH_ERROR'
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: 'LOGGED_OUT'
      };
    default:
      return state;
  }
}
