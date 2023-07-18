import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const ListItem = ({ listing }) => {
  console.log(listing.endDate);
  return (
    <div className='listing-card listing-card-div'>
      <div className='listing-card-image'>
        <img
          src={
            listing.image
              ? listing.image
              : 'https://cdn.steemitimages.com/DQmbQGsqqhgTgZK2Wh4o3o9pALrNqPVryT3AH17J4WExoqS/no-image-available-grid.jpg'
          }
          alt=''
        />
      </div>
      <div className='listing-card-text'>
        <Link className='link' to={`/listings/${listing.slug}`}>
          <h3>{listing.title}</h3>
        </Link>
        <p className='small-text'>${listing.currentPrice}</p>
        <p className='small-text'>{listing.bids.length} Bids</p>
        <p className='small-text'>
          Ends{' '}
          <Moment fromNow local>
            {listing.endDate}
          </Moment>
        </p>
      </div>
    </div>
  );
};

export default ListItem;
