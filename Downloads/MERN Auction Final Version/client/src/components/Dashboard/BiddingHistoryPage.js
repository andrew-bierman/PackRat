import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBiddingHistory, getWonListings } from '../../actions/listing';
import ListItem from '../Listings/ListItem';
import { Link } from 'react-router-dom';
import { clearListings } from '../../actions/listing';
import Spinner from '../Layout/Spinner';

const BiddingHistoryPage = ({
  getBiddingHistory,
  clearListings,
  getWonListings,
  listings: { data, loading },
  auth
}) => {
  useEffect(() => {
    getBiddingHistory();
    return () => {
      clearListings();
    };
  }, [getBiddingHistory, clearListings]);

  const showWonListings = () => {
    clearListings();
    getWonListings();
  };

  const showLostListings = () => {
    clearListings();
  };

  const showBidOnListings = () => {
    clearListings();
    getBiddingHistory();
  };

  return loading || data === null || auth.loading || auth.user === null ? (
    <Spinner />
  ) : (
    <div className='row'>
      <Link to={`/dashboard`}>
        <h4>Back to Dashboard</h4>
      </Link>{' '}
      <h2 className='large-heading'>Active listings you've bid on</h2>
      <p className='small-text'>Found {data.length} results</p>
      <div className='button-row'>
        <button className='btn-gray large btn-spaced' onClick={showWonListings}>
          Show listings you've won
        </button>
        <button
          className='btn-gray large btn-spaced'
          onClick={showLostListings}
        >
          Show listings you've lost
        </button>
        <button
          className='btn-gray large btn-spaced'
          onClick={showBidOnListings}
        >
          Show active listings you've bid on
        </button>
      </div>
      {data.map(listing => (
        <ListItem key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

BiddingHistoryPage.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
  listings: state.listings
});
export default connect(mapStateToProps, {
  getBiddingHistory,
  clearListings,
  getWonListings
})(BiddingHistoryPage);
