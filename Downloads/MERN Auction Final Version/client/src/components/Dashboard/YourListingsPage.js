import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getActiveListingsByToken,
  getInactiveListingsByToken,
  clearListings
} from '../../actions/listing';
import ListItem from '../Listings/ListItem';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';

const YourListingsPage = ({
  getActiveListingsByToken,
  getInactiveListingsByToken,
  clearListings,
  listings: { data, loading },
  auth
}) => {
  const [formData, setFormData] = useState({
    inactive: false
  });

  const { inactive } = formData;
  const onClick = () => {
    console.log(inactive);
    clearListings();
    !inactive === false
      ? getActiveListingsByToken()
      : getInactiveListingsByToken();
    setFormData({ inactive: !inactive });
    console.log(inactive);

    console.log(inactive);
  };

  useEffect(() => {
    getActiveListingsByToken();
    return () => {
      clearListings();
    };
  }, [clearListings, getActiveListingsByToken]);

  return loading || data === null || auth.loading || auth.user === null ? (
    <Spinner />
  ) : (
    <div className='row'>
      <Link to={`/dashboard`}>
        <h4>Back to Dashboard</h4>
      </Link>
      <h2 className='large-heading'>
        Your {inactive === false ? 'Active' : 'Inactive'} Listings
      </h2>
      <p className='small-text'>Found {data.length} results</p>
      <button className='btn-gray large' onClick={onClick}>
        Show {inactive === false ? 'Inactive' : 'Active'} Listings
      </button>
      {data.map(listing => (
        <ListItem key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

YourListingsPage.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
  listings: state.listings
});
export default connect(mapStateToProps, {
  getActiveListingsByToken,
  getInactiveListingsByToken,
  clearListings
})(YourListingsPage);
