import axios from 'axios';
import {
  GET_LISTINGS,
  GET_LISTING,
  CLEAR_LISTINGS,
  CLEAR_LISTING,
  GET_USERS_ACTIVE_LISTINGS,
  GET_USERS_INACTIVE_LISTINGS,
  DELETE_LISTING,
  DELETE_BID,
  LISTING_ERROR
} from './types';
import { addNotification } from './notification';

export const getListings = query => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/${query}`);
    console.log('getting listings');
    console.log(res);
    dispatch({ type: GET_LISTINGS, payload: res.data });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const getListing = slug => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/slug/${slug}`);

    dispatch({ type: GET_LISTING, payload: res.data.listing });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch({ type: LISTING_ERROR });
  }
};

export const createListing = (
  title,
  description,
  minIncrement,
  category,
  endDate,
  condition,
  startPrice,
  image,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    title,
    description,
    minIncrement,
    category,
    endDate,
    condition,
    startPrice,
    image
  };
  try {
    const res = await axios.post('/api/listings', body, config);

    history.push(`/listings/${res.data.listing.slug}`);
  } catch (err) {
    console.log(`Error: ${err}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const deleteListing = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/listings/${id}`);
    dispatch({ type: DELETE_LISTING, payload: res.data });
    dispatch(addNotification('Listing Deleted Successfully', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const editListing = (
  title,
  description,
  category,
  condition,
  minIncrement,
  id,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    title,
    description,
    category,
    minIncrement,
    condition
  };

  try {
    const res = await axios.patch(`/api/listings/${id}`, body, config);
    history.push(`/listings/${res.data.listing.slug}`);
    dispatch(addNotification('Listing Updated Successfully', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const makeBid = (bid, listingId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = {
      bid
    };

    const res = await axios.post(
      `/api/listings/${listingId}/bid`,
      body,
      config
    );

    dispatch({
      type: GET_LISTING,
      payload: res.data.listing
    });
    dispatch(addNotification('Placed bid successfully', 'success'));
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const getActiveListingsByUserId = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/${id}/active`);
    dispatch({
      type: GET_USERS_ACTIVE_LISTINGS,
      payload: res.data
    });
  } catch (err) {
    console.log(`Error: ${err.response}`);
  }
};

export const getInactiveListingsByUserId = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/${id}/inactive`);
    dispatch({
      type: GET_USERS_INACTIVE_LISTINGS,
      payload: res.data
    });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const getActiveListingsByToken = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/dashboard/active`);
    dispatch({
      type: GET_USERS_ACTIVE_LISTINGS,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const getInactiveListingsByToken = id => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/dashboard/inactive`);
    dispatch({
      type: GET_USERS_INACTIVE_LISTINGS,
      payload: res.data
    });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const getBiddingHistory = () => async dispatch => {
  try {
    const res = await axios.get(`/api/users/bids`);
    dispatch({
      type: GET_LISTINGS,
      payload: res.data
    });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const getWonListings = () => async dispatch => {
  try {
    const res = await axios.get(`/api/listings/dashboard/won`);
    dispatch({
      type: GET_USERS_INACTIVE_LISTINGS,
      payload: res.data
    });
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
  }
};

export const clearListings = () => async dispatch => {
  dispatch({ type: CLEAR_LISTINGS });
};

export const clearListing = () => async dispatch => {
  dispatch({ type: CLEAR_LISTING });
};

export const setListingShipped = id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    shipped: Date.now()
  };
  try {
    const res = await axios.patch(`/api/listings/${id}`, body, config);
    dispatch(
      addNotification(
        `Listing ${res.data.listing.title} has been marked as Shipped Successfully`,
        'success'
      )
    );
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};

export const deleteBid = (listingId, bidId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/listings/${listingId}/bid/${bidId}`);
    dispatch({ type: DELETE_BID, payload: res.data });
    dispatch(
      addNotification(
        `Bid  on item "${res.data.title}" Deleted Successfully`,
        'success'
      )
    );
  } catch (err) {
    console.log(`Error: ${err.response.data.message}`);
    dispatch(addNotification(err.response.data.message, 'error'));
  }
};
