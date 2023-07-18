import React, { Fragment, useEffect } from 'react';
import { getListings, clearListings } from '../../actions/listing';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import ListItem from './ListItem';
import PaginationButtons from '../Layout/PaginationButtons';
import AdvancedSearchForm from '../Forms/AdvancedSearchForm';
import Spinner from '../Layout/Spinner';
const queryString = require('query-string');

export const Listings = ({
  getListings,
  location,
  clearListings,
  listings: { loading, data, numListings }
}) => {
  useEffect(() => {
    getListings(location.search);
    return () => {
      clearListings();
    };
  }, [getListings, clearListings]);

  const parsed = queryString.parse(location.search);

  return loading || data === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Helmet>
        <title>Browsing listings | Auction</title>
      </Helmet>
      <div className='row'>
        <div className='page-heading'>
          <h2 className='large-heading'>
            Searching for{' '}
            {parsed.search ? `'${parsed.search}'` : 'all listings'}{' '}
            {parsed.category
              ? `in  the category '${parsed.category}'`
              : 'in all categories'}
          </h2>
          <p className='small-text'>Found {numListings} results </p>
        </div>

        <div className='listings-page-div'>
          <AdvancedSearchForm />
          <div className='listings-div'>
            {data.map(listing => (
              <ListItem key={listing._id} listing={listing} />
            ))}
            <PaginationButtons
              numListings={numListings}
              parsed={parsed}
              query={location.search}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  listings: state.listings
});

export default connect(mapStateToProps, { getListings, clearListings })(
  Listings
);
