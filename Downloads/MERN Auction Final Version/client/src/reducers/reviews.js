import {
  GET_REVIEWS,
  CLEAR_REVIEWS,
  CREATE_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW,
  MARK_REVIEW_HELPFUL
} from '../actions/types';

const initialState = {
  data: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case MARK_REVIEW_HELPFUL:
      return {
        ...state,
        data: state.data.map(review =>
          review._id == payload._id ? payload : review
        ),
        loading: false
      };
    case GET_REVIEWS:
      return {
        ...state,
        data: state.data.concat(payload),
        loading: false
      };
    case CREATE_REVIEW:
      return {
        ...state,
        data: state.data.concat(payload),
        loading: false
      };
    case EDIT_REVIEW:
      console.log(payload);
      return {
        ...state,
        data: state.data.map(review =>
          review._id == payload._id ? payload : review
        ),
        loading: false
      };
    case CLEAR_REVIEWS:
      return {
        ...state,
        data: [],
        loading: true
      };
    case DELETE_REVIEW:
      return {
        ...state,
        data: state.data.filter(review => review._id !== payload._id)
      };
    default:
      return state;
  }
}
