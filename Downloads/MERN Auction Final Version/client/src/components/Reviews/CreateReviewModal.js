import React, { useState, useEffect, Fragment } from 'react';
import { createReview } from '../../actions/review';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

const ReportForm = ({ type, createReview, id }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    rating: 1
  });

  const [modalData, setModalData] = useState({
    showModal: false
  });

  const [uploading, setUploading] = useState(false);

  const [verified, setVerified] = useState(false);

  const { title, text, rating } = formData;

  const { showModal } = modalData;

  const handleOpenModal = () => {
    setModalData({ showModal: true });
  };

  const handleCloseModal = () => {
    setModalData({ showModal: false });
  };
  useEffect(() => {
    setFormData({ reportedRef: type });
  }, [type]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const verifyCallback = async e => {
    await setVerified(true);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (verified) {
      setUploading(true);
      await createReview(id, title, text, rating);
      setUploading(false);
      handleCloseModal();
    } else {
      alert('Do the CAPTCHA');
    }
  };

  return (
    <Fragment>
      <button className='white-btn large' onClick={handleOpenModal}>
        Create Review
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
        <form className='form' onSubmit={e => onSubmit(e)}>
          <h1 className='large-heading'>Creating review</h1>
          <p className='small-text'>Idk</p>
          <div className='form-group'>
            <h2 className='medium-heading'>Title of your review</h2>
            <input
              type='text'
              placeholder='Title of your review'
              name='title'
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h2 className='medium-heading'>Rating out of 5</h2>
            <select onChange={e => onChange(e)} name='rating' value={rating}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className='form-group'>
            <h2 className='medium-heading'>Review body</h2>
            <textarea
              placeholder='Enter your review'
              name='text'
              value={text}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h2 className='medium-heading'>Captcha</h2>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey='6Lcck9cUAAAAAIuHfUVETNVzklfJ6QkJ69V5tor0'
                onChange={verifyCallback}
              />
            </div>
          </div>
          <input
            type='submit'
            className='btn-gray large full'
            value={uploading ? 'Publishing review...' : 'Publish review'}
          />
        </form>
      </ReactModal>
    </Fragment>
  );
};

ReportForm.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token,
  listing: state.listing
});

export default connect(mapStateToProps, { createReview })(ReportForm);
