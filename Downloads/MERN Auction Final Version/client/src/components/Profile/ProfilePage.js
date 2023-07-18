import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserById, clearUser } from '../../actions/user';
import { connect } from 'react-redux';
import { getListings, clearListings } from '../../actions/listing';
import { clearReviews, getReviewsWrittenForUser } from '../../actions/review';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Moment from 'react-moment';
import CreateReportModal from '../Report/CreateReportModal';
import ViewReviewsModal from './ViewReviewsModal';
import CreateReviewModal from '../Reviews/CreateReviewModal';
import ListingCard from '../Listing/ListingCard';
import Spinner from '../Layout/Spinner';

const ProfilePage = ({
  match,
  getUserById,
  user,
  clearUser,
  getListings,
  clearListings,
  getReviewsWrittenForUser,
  auth,
  clearReviews,
  listings
}) => {
  useEffect(() => {
    getReviewsWrittenForUser(match.params.id);
    getListings(`?createdBy=${match.params.id}&limit=5`);
    getUserById(match.params.id);
    return () => {
      clearUser();
      clearReviews();
      clearListings();
    };
  }, [
    getListings,
    getUserById,
    clearUser,
    clearListings,
    match.params.id,
    clearReviews
  ]);

  return (user.loading ||
    user.data === null ||
    auth.loading ||
    auth.user === null ||
    listings.loading ||
    listings.data === null) &&
    !user.errors ? (
    <Spinner />
  ) : user.errors ? (
    <div>No user found</div>
  ) : (
    <Fragment>
      <Helmet>
        <title>{user.data.name}'s profile | Auction</title>
      </Helmet>
      <div class='row'>
        <div className='profile-top'>
          <img
            onLoad={console.log('xd')}
            src={user.data.avatar}
            className='round-image'
            alt='User profile picture'
          />
          <h2 className='large-heading'>{user.data.name}</h2>
          <h4 className='medium-heading'>
            User since <Moment>{user.data.date}</Moment>
          </h4>
          {user.data.location && (
            <h4 className='medium-heading'>Located in {user.data.location}</h4>
          )}
          {auth.isAuthenticated && auth.user._id != user.data._id && (
            <CreateReportModal type={'user'} id={user.data._id} />
          )}
          {auth.isAuthenticated && auth.user._id != user.data._id && (
            <CreateReviewModal id={user.data._id} />
          )}
          <ViewReviewsModal match={match} />
        </div>
        <div>
          <h2 className='large-heading'>
            {user.data.name.split(' ')[0]}'s bio
          </h2>
          <p className='small-text'>
            {user.data.bio ? user.data.bio : 'This user has no bio'}
          </p>
        </div>

        <div className='listing-card-row'>
          <h2 className='large-heading'>
            Browse {user.data.name.split(' ')[0]}'s recent listings
            <span>
              <Link
                className='link see-more'
                to={`/listings?createdBy=${user.data._id}`}
              >
                <h4>See more</h4>
              </Link>
            </span>
          </h2>
          {listings.data.length === 0
            ? 'This user has no active listenings at the moment'
            : listings.data.map(listing => (
                <ListingCard id={listing._id} listing={listing} />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

ProfilePage.propTypes = {};

const mapStateToProps = state => ({
  user: state.user,
  listings: state.listings,
  reviews: state.reviews,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getUserById,
  clearUser,
  getListings,
  clearListings,
  clearReviews,
  getReviewsWrittenForUser
})(ProfilePage);
