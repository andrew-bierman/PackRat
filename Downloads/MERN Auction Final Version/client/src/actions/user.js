import axios from 'axios';
import { GET_USER, USER_ERROR, CLEAR_USER } from './types';
import { addNotification } from './notification';

export const getUserById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch({ type: GET_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_ERROR });
  }
};

export const getUserByToken = () => async dispatch => {
  const res = await axios.get(`/api/users/me`);
  dispatch({ type: GET_USER, payload: res.data });
};

export const updateUserProfile = (
  name,
  email,
  location,
  bio
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    name,
    email,
    location,
    bio
  };

  try {
    await axios.patch('/api/users/me', body, config);
    dispatch(addNotification('Profile updated Successfully', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const clearUser = () => async dispatch => {
  dispatch({ type: CLEAR_USER });
};
