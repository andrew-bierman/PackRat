import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Dashboard = props => {
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard | Auction</title>
      </Helmet>
      <div className='row'>
        <h2 className='large-heading'>Dashboard</h2>
        <p className='small-text'>Welcome to your dashboard, user</p>
        <div className='button-row'>
          <Link className='btn-gray btn-spaced large' to='/dashboard/edit'>
            Edit Profile
          </Link>
          <Link className='btn-gray btn-spaced large' to='/dashboard/listings'>
            View your listings
          </Link>
          <Link className='btn-gray btn-spaced large' to='/dashboard/bids'>
            View your bid history
          </Link>
          <Link className='btn-gray btn-spaced large' to='/dashboard/reviews'>
            View your reviews
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
