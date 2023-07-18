import React, { useState, useEffect, Fragment } from 'react';
import ImageGallery from 'react-image-gallery';
import { getListings, clearListings } from '../../actions/listing';
import { connect } from 'react-redux';
import ListingCard from '../Listing/ListingCard';
import Spinner from './../Layout/Spinner';

export const HomePage = ({ getListings, clearListings, listings }) => {
  const [imageLoadedCount, setCount] = useState(1);
  const [imagesLoading, setImagesLoading] = useState(true);
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/'
    }
  ];

  const handleImageLoad = () => {
    setCount(imageLoadedCount + 1);
    if (imageLoadedCount === 3) {
      console.log('loaded');
      setImagesLoading(false);
    }
  };

  useEffect(() => {
    getListings('?limit=5');
    return () => {
      clearListings();
    };
  }, [getListings, clearListings]);

  return listings.loading || listings.data === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {imagesLoading && <Spinner />}
      <div
        style={{ display: imagesLoading ? 'none' : 'block' }}
        className='row'
      >
        <ImageGallery
          showThumbnails={false}
          onImageLoad={handleImageLoad}
          items={images}
        />
        <div className='listing-card-row'>
          <h2 className='large-heading'>More Items to consider</h2>
          {listings.data.map(listing => (
            <ListingCard id={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  listings: state.listings
});

export default connect(mapStateToProps, { clearListings, getListings })(
  HomePage
);
