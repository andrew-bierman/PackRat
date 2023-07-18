import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createReport } from '../../actions/report';
import ReCAPTCHA from 'react-google-recaptcha';
import ReactModal from 'react-modal';

const CreateReportModal = ({ type, createReport, id }) => {
  const [formData, setFormData] = useState({
    reason: '',
    reportedRef: ''
  });

  const [modalData, setModalData] = useState({
    showModal: false
  });

  const [verified, setVerified] = useState(false);

  const [captchaLoading, setCaptchaLoading] = useState(true);

  const { reportedRef, reason } = formData;

  const { showModal } = modalData;

  const handleOpenModal = () => {
    setModalData({ showModal: true });
  };

  const handleCloseModal = () => {
    setModalData({ showModal: false });
  };

  const onloadCallback = () => {
    setCaptchaLoading(false);
    console.log('loaded');
  };
  var callback = function() {
    console.log('Done!!!!');
  };

  useEffect(() => {
    setFormData({ reportedRef: type });
  }, []);

  const onChange = e => setFormData({ ...formData, reason: e.target.value });

  const verifyCallback = async e => {
    await setVerified(true);
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (verified) {
      createReport(id, reason, reportedRef);
      handleCloseModal();
      setFormData({ ...formData, reason: '' });
      await setVerified(false);
    } else {
      alert('Do the CAPTCHA');
    }
  };

  return (
    <Fragment>
      <button className='white-btn large' onClick={handleOpenModal}>
        Report {type}
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
          <h2 className='large-heading'>{`Report a ${type}`}</h2>
          <p className='small-text'>Reporting</p>
          <div className='form-group'>
            <h4 className='medium-heading'>Reason for report</h4>
            <input
              type='text'
              placeholder='Reason for this report'
              name='reason'
              value={reason}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Captcha</h4>
            <div className='recaptcha-container'>
              <ReCAPTCHA
                sitekey='6Lcck9cUAAAAAIuHfUVETNVzklfJ6QkJ69V5tor0'
                render='explicit'
                onChange={verifyCallback}
                onloadCallback={onloadCallback}
              />
            </div>
          </div>
          <input
            type='submit'
            className='btn-gray large full'
            value={`Submit report for ${type}`}
          />
        </form>
      </ReactModal>
    </Fragment>
  );
};

CreateReportModal.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token,
  listing: state.listing
});

export default connect(mapStateToProps, { createReport })(CreateReportModal);
