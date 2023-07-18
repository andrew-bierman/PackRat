import axios from 'axios';
import { addNotification } from './notification';

export const createReport = (id, reason, reportedRef) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      reason,
      reportedRef
    };

    await axios.post(`/api/report/${id}`, body, config);
    dispatch(addNotification('Report Created Successfully!', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};
