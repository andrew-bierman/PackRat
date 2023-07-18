import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditReviewModal from './EditReviewModal';
import { deleteReview, markReviewAsHelpful } from '../../actions/review';
import CreateReportModal from '../Report/CreateReportModal';
import StarRatingComponent from 'react-star-rating-component';

const ReviewItem = ({ review, auth, deleteReview, markReviewAsHelpful }) => {
  const [uploading, setUploading] = useState(false);

  const handleDeleteOption = () => {
    deleteReview(review._id);
  };

  const handleHelpfulOption = async e => {
    setUploading(true);
    await markReviewAsHelpful(review._id);
    setUploading(false);
  };
  return (
    <div className='review-item'>
      <h2 className='medium-heading'>{review.title}</h2>
      <div style={{ fontSize: 40 }}>
        <StarRatingComponent editing={false} value={review.rating} />
      </div>
      <p className='small-text'>{review.text}</p>
      <p className='small-text'>
        By{' '}
        <Link to={`/profile/${review.writtenBy.split(' ')[0]}`}>
          {review.writtenBy} on {review.writtenAt}
        </Link>
      </p>
      {!auth.loading && auth.user._id === review.writtenBy && (
        <div>
          <EditReviewModal id={review._id} />
          <button className='white-btn large' onClick={handleDeleteOption}>
            Delete Review
          </button>
        </div>
      )}
      {!auth.loading &&
        auth.isAuthenticated &&
        auth.user._id !== review.writtenBy &&
        (review.markedAsHelpful.some(el => el.user === auth.user._id) ? (
          <button className='ghost-btn large'>Thanks for your feedback!</button>
        ) : (
          <button className='ghost-btn large' onClick={handleHelpfulOption}>
            {uploading ? 'Sending feedback...' : 'Mark review as helpful'}
          </button>
        ))}
      {!auth.loading &&
        auth.isAuthenticated &&
        auth.user._id !== review.writtenBy && (
          <CreateReportModal type={'review'} id={review._id} />
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteReview, markReviewAsHelpful })(
  ReviewItem
);
