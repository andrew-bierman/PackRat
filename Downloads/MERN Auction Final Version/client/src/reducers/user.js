import { GET_USER, CLEAR_USER, USER_ERROR } from '../actions/types';

const initialState = {
  data: null,
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER: {
      return { ...state, data: payload, loading: false };
    }
    case CLEAR_USER: {
      return {
        ...state,
        data: null,
        errors: null,
        loading: true
      };
    }
    case USER_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        errors: 'ERROR'
      };
    default:
      return state;
  }
}
