import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListings, clearListings } from '../../actions/listing';
const queryString = require('query-string');

const PaginationButtons = ({
  parsed,
  numListings,
  getListings,
  clearListings
}) => {
  // const page = parsed.page || 1;
  const limit = parsed.limit || 10;
  const lastPage = Math.ceil(numListings / limit);
  let history = useHistory();
  var search = '';

  const onClick = num => {
    clearListings();
    parsed.page = num;
    parsed.limit = limit;
    search = '?' + queryString.stringify(parsed);
    history.push(`/listings${search}`);
    getListings(search);
  };
  return (
    <div className='pagination-buttons-div'>
      <span className='pagination-buttons small-text'>
        <button className='btn-gray large' onClick={() => onClick(1)}>
          First Page
        </button>
        {parsed.page > 1 && (
          <button
            className='btn-gray large'
            onClick={() => onClick(parseInt(parsed.page) - 1)}
          >
            <i class='fas fa-arrow-left'></i>
          </button>
        )}
        Page {parsed.page}
        {parseInt(parsed.page) < lastPage && (
          <button
            className='btn-gray large'
            onClick={() => onClick(parseInt(parsed.page) + 1)}
          >
            <i class='fas fa-arrow-right'></i>
          </button>
        )}
        <button className='btn-gray large' onClick={() => onClick(lastPage)}>
          Last Page
        </button>
      </span>
    </div>
  );
};

PaginationButtons.propTypes = {};

export default connect(null, { getListings, clearListings })(PaginationButtons);
