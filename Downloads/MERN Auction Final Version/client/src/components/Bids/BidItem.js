import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteBid } from '../../actions/listing';
import Moment from 'react-moment';

const BidItem = ({ bid, auth, deleteBid, listingId, socket }) => {
  const onClick = async e => {
    await deleteBid(listingId, bid._id);
    socket.emit('deleted bid');
    console.log(socket);
  };

  return (
    <div className='bid-item'>
      <p className='small-text'>
        {(bid.bid / 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'AUD'
        })}{' '}
        was bid{' '}
        <Moment fromNow ago local>
          {bid.createdAt}
        </Moment>{' '}
        ago{' '}
        {!auth.loading && auth.user._id == bid.user && (
          <button className='white-btn small right' onClick={onClick}>
            DELETE
          </button>
        )}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteBid })(BidItem);
