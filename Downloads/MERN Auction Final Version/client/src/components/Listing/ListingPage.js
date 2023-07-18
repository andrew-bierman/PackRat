import React, { Fragment, useEffect, useState } from 'react';
import {
  getListing,
  makeBid,
  getListings,
  clearListing,
  clearListings
} from '../../actions/listing';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import CreateReportModal from '../Report/CreateReportModal';
import Countdown from '../Layout/Countdown';
import ViewBidsModal from '../Bids/ViewBidsModal';
import ListingCard from './ListingCard';
import Spinner from './../Layout/Spinner';

const Listing = ({
  getListing,
  makeBid,
  match,
  getListings,
  clearListing,
  clearListings,
  listings,
  listing: { data, loading, errors },
  auth
}) => {
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    getListing(match.params.slug);
    var socket_connect = function(room) {
      return io('http://172.17.19.180:5000/', {
        query: 'r_var=' + room
      });
    };
    var room = window.location.pathname;
    var socket = socket_connect(room);

    socket.emit('join');

    setSocketData({ socket });

    socket.on('bid', function() {
      getListing(match.params.slug);
    });
    return () => {
      clearListing();
      clearListings();
      console.log('disconnecting..');
      socket.emit('unsubscribe', room);
    };
  }, [getListing, clearListings, clearListing, match.params.slug]);

  useEffect(() => {
    getListings('?limit=5');
  }, [getListings, match.params.slug]);

  const [socketData, setSocketData] = useState({
    socket: ''
  });

  let { socket } = socketData;

  const [formData, setFormData] = useState({
    bid: ''
  });

  const { bid } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    if (bid * 100 > data.currentPrice + data.minIncrement) {
      await makeBid(bid, data._id);
      socket.emit('bid');
    } else {
      console.log("Bid isn't big enough");
    }
    setUploading(false);
    setFormData({ bid: '' });
  };

  return (loading ||
    data === null ||
    listings.data === null ||
    listings.loading) &&
    !errors ? (
    <Spinner />
  ) : errors ? (
    <div>No listing found</div>
  ) : (
    <Fragment>
      <Helmet>
        <title>{data.title} | Auction</title>
      </Helmet>
      <div className='row'>
        <div className='listing-page'>
          <div className='listing-page-img'>
            <img
              src={
                data.image
                  ? data.image
                  : 'https://cdn.steemitimages.com/DQmbQGsqqhgTgZK2Wh4o3o9pALrNqPVryT3AH17J4WExoqS/no-image-available-grid.jpg'
              }
              alt=''
            />
          </div>
          <div className='listing-page-text'>
            <h2 className='large-heading'>{data.title}</h2>
            {!data.active && <h3>Listing has ended</h3>}
            <Link className='link' to={`/profile/${data.createdBy._id}`}>
              <h3>Listing created by {data.createdBy.name}</h3>
            </Link>
            <h3 className='small-heading'>
              Bids: <ViewBidsModal data={data} socket={socket} />
            </h3>
            <h3 className='small-heading'>
              Time Left: <Countdown endDate={data.endDate} />
            </h3>
            <h3 className='small-heading'>
              Current Price:
              {(data.currentPrice / 100).toLocaleString('en-US', {
                style: 'currency',
                currency: 'AUD'
              })}
            </h3>

            <form className='bidding-form' onSubmit={e => onSubmit(e)}>
              <div className='bid-form-group'>
                <input
                  type='number'
                  placeholder={`Enter bid higher than ${(
                    (data.currentPrice + data.minIncrement) /
                    100
                  ).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'AUD'
                  })}`}
                  name='bid'
                  value={bid}
                  step='0.01'
                  onChange={e => onChange(e)}
                  disabled={!data.active}
                  required
                />
                <input
                  type='submit'
                  className='btn btn-primary'
                  value={uploading ? 'Placing..' : 'Place bid'}
                  disabled={!data.active}
                />
              </div>
            </form>

            {auth.isAuthenticated && auth.user._id !== data.createdBy._id && (
              <CreateReportModal type={'Listing'} id={data._id} />
            )}
            {!auth.loading && auth.user._id === data.createdBy._id && (
              <Link to={`/listings/${data.slug}/edit`}>
                <h4>EDIT</h4>
              </Link>
            )}
          </div>
        </div>
        <div className='item-description'>
          <h3 className='small-heading'>Product Description</h3>
          <p className='small-text'>
            {data.description
              ? data.description
              : 'The seller has not provided a description for this item'}
          </p>
        </div>
        <div className='listing-card-row'>
          <h2 className='large-heading'>More Items to consider</h2>
          {listings.data.map(listing => (
            <ListingCard id={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  listing: state.listing,
  auth: state.auth,
  listings: state.listings
});

export default connect(mapStateToProps, {
  getListing,
  getListings,
  makeBid,
  clearListing,
  clearListings
})(Listing);
