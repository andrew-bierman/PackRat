import { GET_REVIEW, REVIEW_ERROR, CLEAR_REVIEW } from '../actions/types';

const initialState = {
  data: null,
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REVIEW:
      return {
        ...state,
        data: payload,
        loading: false
      };
    case REVIEW_ERROR:
      return {
        ...state,
        data: [],
        loading: false,
        errors: 'ERROR'
      };
    case CLEAR_REVIEW:
      return {
        ...state,
        data: null,
        loading: true,
        errors: null
      };
    default:
      return state;
  }
}
