import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import BidItem from './BidItem';

const ViewBidsModal = ({ data, socket }) => {
  const [showModal, setModalData] = useState(false);

  const handleOpenModal = () => {
    setModalData(true);
  };

  const handleCloseModal = () => {
    setModalData(false);
  };
  return (
    <Fragment>
      <Link className='link' onClick={handleOpenModal}>
        <h3>{data.bids.length}</h3>
      </Link>
      <ReactModal
        className='modal'
        overlayClassName='overlay'
        isOpen={showModal}
        closeTimeoutMS={0}
        onRequestClose={handleCloseModal}
        onAfterClose={handleCloseModal}
        onAfterOpen={handleOpenModal}
      >
        <h2 className='large-heading'>Bids</h2>
        {data.bids.length === 0 ? (
          <p className='small-text'>There are no bids on this item yet</p>
        ) : (
          <div>
            {data.bids.map(bid => (
              <BidItem
                listingId={data._id}
                key={bid._id}
                bid={bid}
                socket={socket}
              />
            ))}
          </div>
        )}
      </ReactModal>
    </Fragment>
  );
};

ViewBidsModal.propTypes = {};

export default ViewBidsModal;
