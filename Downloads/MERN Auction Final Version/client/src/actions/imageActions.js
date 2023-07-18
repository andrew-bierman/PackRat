import axios from 'axios';

export const addImage = imageData => async dispatch => {
  const res = await axios.post('/api/listings/upload/image', imageData);
  console.log(res);
};
