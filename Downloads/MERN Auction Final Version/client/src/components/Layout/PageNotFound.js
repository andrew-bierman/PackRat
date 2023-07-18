import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const PageNotFound = props => {
  return (
    <div>
      <Helmet>
        <title>Page not found! | Auction</title>
      </Helmet>
      <div className='row'>
        <h2 className='large-heading'>404: Page Not Found</h2>
        <p className='small-text'>
          Sorry, but the page you are looking for was not found. Please make
          sure you have typed the current URL correctly.
        </p>
      </div>
    </div>
  );
};

PageNotFound.propTypes = {};

export default PageNotFound;
