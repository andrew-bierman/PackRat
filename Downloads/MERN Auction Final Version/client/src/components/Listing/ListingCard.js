import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className='listing-card-item'>
      <img
        src={
          listing.image
            ? listing.image
            : 'https://cdn.steemitimages.com/DQmbQGsqqhgTgZK2Wh4o3o9pALrNqPVryT3AH17J4WExoqS/no-image-available-grid.jpg'
        }
        alt='Listing Image'
      />
      <Link className='link' to={`/listings/${listing.slug}`}>
        <h4>{listing.title}</h4>
      </Link>
      <p className='small-text'>
        {(listing.currentPrice / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'AUD'
        })}
      </p>
    </div>
  );
};

ListingCard.propTypes = {};

export default ListingCard;
