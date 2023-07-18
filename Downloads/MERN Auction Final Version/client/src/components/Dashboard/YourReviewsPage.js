import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getReviewsWrittenByUser,
  getReviewsWrittenForUser,
  clearReviews
} from '../../actions/review';
import { clearListings } from '../../actions/listing';
import { Link } from 'react-router-dom';
import ReviewItem from '../Reviews/ReviewItem';
import Spinner from '../Layout/Spinner';

const YourReviewsPage = ({
  clearListings,
  clearReviews,
  auth,
  reviews: { data, loading },
  getReviewsWrittenByUser,
  getReviewsWrittenForUser
}) => {
  const [formData, setFormData] = useState({
    writtenByYou: false
  });

  const { writtenByYou } = formData;

  const onClick = () => {
    !writtenByYou === false
      ? getReviewsWrittenByUser()
      : getReviewsWrittenForUser(auth.user._id);
    setFormData({ writtenByYou: !writtenByYou });
  };

  useEffect(() => {
    getReviewsWrittenByUser();
    return () => {
      clearReviews();
    };
  }, [clearReviews, getReviewsWrittenByUser]);

  return auth.loading || auth.user === null || loading || data === null ? (
    <Spinner />
  ) : (
    <div className='row'>
      <Link to={`/dashboard`}>
        <h4>Back to Dashboard</h4>
      </Link>{' '}
      <h2 className='large-heading'>
        Reviews customers have written about you
      </h2>
      <p className='small-text'>Found {data.length} results</p>
      <button className='btn-gray large' onClick={onClick}>
        Show reviews you've written
      </button>
      {data.map(review => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

YourReviewsPage.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth,
  reviews: state.reviews
});

export default connect(mapStateToProps, {
  clearListings,
  getReviewsWrittenByUser,
  getReviewsWrittenForUser,
  clearReviews
})(YourReviewsPage);
