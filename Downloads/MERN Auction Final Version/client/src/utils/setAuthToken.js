import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    console.log('setting');
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
