import React, { useState } from 'react';
import { getReviewsWrittenForUser, clearReviews } from '../../actions/review';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import ReactModal from 'react-modal';
import ReviewItem from '../Reviews/ReviewItem';

const ViewReviewsModal = ({ reviews }) => {
  const [formData, setFormData] = useState({
    showModal: false
  });

  const { showModal } = formData;

  const handleOpenModal = () => {
    setFormData({ ...formData, showModal: true });
  };

  const handleCloseModal = () => {
    setFormData({ ...formData, showModal: false });
  };

  return reviews.data === [] || reviews.loading ? (
    <div>Loadin xd g..</div>
  ) : (
    <Fragment>
      <button className='white-btn large' onClick={handleOpenModal}>
        View Reviews
      </button>
      <ReactModal
        className='modal'
        overlayClassName='overlay'
        isOpen={showModal}
        closeTimeoutMS={0}
        onRequestClose={handleCloseModal}
        onAfterClose={handleCloseModal}
        onAfterOpen={handleOpenModal}
      >
        <h2 className='large-heading'>Reviews</h2>
        {reviews.data.length === 0 ? (
          <p className='small-text'>This user has no reviews yet</p>
        ) : (
          reviews.data.map(review => (
            <ReviewItem key={review._id} review={review} />
          ))
        )}
      </ReactModal>
    </Fragment>
  );
};

ViewReviewsModal.propTypes = {};

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(mapStateToProps, {
  getReviewsWrittenForUser,
  clearReviews
})(ViewReviewsModal);
