import React, { Fragment } from 'react';
import SpinnerGif from './Spinner.gif';
import { Helmet } from 'react-helmet';

const Spinner = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Loading.. | Auction</title>
      </Helmet>
      <div className='spinner-container'>
        <img src={SpinnerGif} className='spinner-img' alt='Loading' />
      </div>
    </Fragment>
  );
};

export default Spinner;
