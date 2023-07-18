import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createListing, getListing } from '../../actions/listing';

const ListingForm = ({
  createListing,
  token,
  type,
  match,
  listing: { loading, listing }
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    minIncrement: '',
    category: '',
    length: '',
    condition: ''
  });

  const {
    title,
    description,
    minIncrement,
    category,
    length,
    condition
  } = formData;

  useEffect(() => {
    setFormData({
      title: loading || type == 'create' ? '' : listing.title,
      description: loading || type == 'create' ? '' : listing.description,
      minIncrement: loading || type == 'create' ? '' : listing.minIncrement,
      category: loading || type == 'create' ? '' : listing.category,
      length: loading || type == 'create' ? '' : listing.length,
      condition: loading || type == 'create' ? '' : listing.condition
    });
  }, [loading, listing]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    createListing(
      title,
      description,
      minIncrement,
      category,
      length,
      condition,
      token
    );
  };

  return (
    <Fragment>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Name of Item'
            name='title'
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
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
          <input
            type='number'
            placeholder='Minimum Increment'
            name='minIncrement'
            value={minIncrement}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='number'
            placeholder='Length'
            name='length'
            value={length}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='textarea'
            placeholder='Description'
            name='description'
            value={description}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type='submit'
          className='btn btn-primary'
          value={type === 'create' ? 'Create Listing' : 'Edit Listing'}
        />
      </form>
    </Fragment>
  );
};

ListingForm.propTypes = {};

const mapStateToProps = state => ({
  token: state.auth.token,
  listing: state.listing
});

export default connect(mapStateToProps, { createListing })(ListingForm);
