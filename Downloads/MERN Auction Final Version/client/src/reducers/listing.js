import {
  GET_LISTING,
  CLEAR_LISTING,
  DELETE_BID,
  LISTING_ERROR
} from '../actions/types';

const initialState = {
  data: null,
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELETE_BID:
    case GET_LISTING: {
      return { ...state, data: payload, loading: false };
    }
    case CLEAR_LISTING:
      return {
        ...state,
        data: null,
        loading: true,
        errors: null
      };
    case LISTING_ERROR:
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
