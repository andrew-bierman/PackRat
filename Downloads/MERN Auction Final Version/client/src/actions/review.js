import axios from 'axios';
import {
  GET_REVIEW,
  CLEAR_REVIEWS,
  CREATE_REVIEW,
  GET_REVIEWS,
  DELETE_REVIEW,
  CLEAR_REVIEW,
  EDIT_REVIEW,
  MARK_REVIEW_HELPFUL,
  REVIEW_ERROR
} from './types';
import { addNotification } from './notification';

export const createReview = (id, title, text, rating) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      title,
      text,
      rating
    };

    console.log(body);
    const res = await axios.post(`/api/review/${id}`, body, config);
    dispatch(addNotification('Review Created Successfully!', 'success'));
    dispatch({ type: CREATE_REVIEW, payload: res.data });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const deleteReview = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/review/${id}`);
    dispatch({ type: DELETE_REVIEW, payload: res.data });
    dispatch(addNotification('Review Deleted Successfully!', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const getReview = id => async dispatch => {
  try {
    // dispatch({ type: CLEAR_REVIEWS });
    const res = await axios.get(`/api/review/${id}/one`);
    dispatch({ type: GET_REVIEW, payload: res.data.review });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
    dispatch({ type: REVIEW_ERROR });
  }
};

export const clearReviews = () => async dispatch => {
  dispatch({ type: CLEAR_REVIEWS });
};

export const clearReview = () => async dispatch => {
  dispatch({ type: CLEAR_REVIEW });
};

export const getReviewsWrittenForUser = (id, page, limit) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/review/${id}?page=${page}&limit=${limit}`
    );
    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const getReviewsWrittenByUser = () => async dispatch => {
  try {
    dispatch({ type: CLEAR_REVIEWS });
    const res = await axios.get(`/api/review`);
    dispatch({ type: GET_REVIEWS, payload: res.data });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const editReview = (title, text, rating, id) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    title,
    text,
    rating
  };

  try {
    const res = await axios.patch(`/api/review/${id}`, body, config);
    dispatch(addNotification('Review Edited Successfully!', 'success'));
    dispatch({ type: EDIT_REVIEW, payload: res.data });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const markReviewAsHelpful = id => async dispatch => {
  try {
    const res = await axios.post(`/api/review/${id}/mark-helpful`);
    dispatch({ type: MARK_REVIEW_HELPFUL, payload: res.data.review });
    dispatch(
      addNotification('Review Marked as Helpful Successfully', 'success')
    );
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};
