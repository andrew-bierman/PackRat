import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editListing, getListing, clearListing } from '../../actions/listing';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../Layout/Spinner';
import ReCAPTCHA from 'react-google-recaptcha';

const EditListingPage = ({
  editListing,
  auth: { authLoading, user },
  match,
  history,
  getListing,
  clearListing,
  listing: { data, loading, errors }
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minIncrement: '',
    category: '',
    length: '',
    condition: '',
    image: ''
  });

  const [verified, setVerified] = useState(false);

  const verifyCallback = e => {
    setVerified(true);
  };
  let {
    title,
    description,
    category,
    condition,
    minIncrement,
    image
  } = formData;

  useEffect(() => {
    getListing(match.params.slug);
    return () => {
      clearListing();
    };
  }, [getListing]);

  useEffect(() => {
    setFormData({
      title: loading || !data.title ? '' : data.title,
      description: loading || !data.description ? '' : data.description,
      category: loading || !data.category ? '' : data.category,
      condition: loading || !data.condition ? '' : data.condition,
      endDate: loading || !data.endDate ? '' : data.endDate,
      minIncrement: loading || !data.minIncrement ? '' : data.minIncrement / 100
    });
  }, [loading, data]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (verified) {
      editListing(
        title,
        description,
        category,
        condition,
        minIncrement,
        data._id,
        history
      );
    } else {
      alert('Please do the CAPTCHA');
    }
  };

  if (!authLoading && data !== null && user !== null && !errors) {
    if (user._id != data.createdBy._id) {
      return <Redirect to='/dashboard' />;
    }
  }

  return (loading || data === null) && !errors ? (
    <Spinner />
  ) : errors ? (
    <div>No listing found</div>
  ) : (
    <Fragment>
      <Helmet>
        <title>Edit listing | Auction</title>
      </Helmet>
      <div className='row'>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <h2 className='large-heading'>Edit Listing</h2>
          <p className='small-text'>
            Edit the contents of a listing you have made
          </p>
          <div className='form-group'>
            <h4 className='medium-heading'>Item name</h4>
            <input
              type='text'
              placeholder='* Name of Item'
              name='title'
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Item Desscription</h4>
            <textarea
              placeholder='Description'
              name='description'
              value={description}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Item Category</h4>
            <input
              type='text'
              placeholder='*category'
              name='category'
              value={category}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Minimum Increment</h4>
            <input
              type='number'
              placeholder='Minimum Increment'
              name='minIncrement'
              step='0.01'
              value={minIncrement}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Condition</h4>
            <select
              onChange={e => onChange(e)}
              name='condition'
              value={condition}
            >
              <option value='used'>Used</option>
              <option value='new'>New</option>
            </select>
          </div>
          <div className='form-group'>
            <h4 className='medium-heading'>Captcha</h4>
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
            value='Edit Listing'
          />
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  listing: state.listing
});

export default connect(mapStateToProps, {
  getListing,
  clearListing,
  editListing
})(EditListingPage);
