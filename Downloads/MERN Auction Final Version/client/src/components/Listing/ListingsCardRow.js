import React from 'react';
import PropTypes from 'prop-types';
import ListingCard from './ListingCard';

const ListingsCardRow = ({ listings }) => {
  console.log(listings);
  return listings === null ? (
    <div>Loading..</div>
  ) : (
    <div className='row'>
      {listings.map(listing => (
        <ListingCard
          id={listing._id}
          title={listing.title}
          price={listing.currentPrice}
        />
      ))}
    </div>
  );
};

ListingsCardRow.propTypes = {};

export default ListingsCardRow;
