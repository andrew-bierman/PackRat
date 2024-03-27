import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePackItem } from '../../store/packsStore';
import { CustomModal } from '../modal';
import {
  deleteGlobalItem,
  deleteItemOffline,
} from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';

export const DeletePackItemModal = ({
  itemId,
  pack,
  refetch,
  setRefetch = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.offlineQueue);
  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  /**
   * Sets the value of `isModalOpen` to `true`.
   *
   * @param {}
   * @return {}
   */
  const onTrigger = () => {
    setIsModalOpen(true);
  };

  /**
   * Deletes an item.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const deleteItemHandler = () => {
    if (pack) {
      dispatch(deletePackItem({ itemId, currentPackId: pack._id }));
    } else {
      if (isConnected) {
        dispatch(deleteGlobalItem(itemId));
        setRefetch(refetch !== true);
      } else {
        dispatch(deleteItemOffline(itemId));
        dispatch(addOfflineRequest({ method: 'deleteItem', data: itemId }));
      }
    }
    setIsModalOpen(false);
  };

  const footerButtons = [
    {
      label: 'Cancel',
      onClick: closeModalHandler,
      color: 'gray',
      disabled: false,
    },
    {
      label: 'Delete',
      onClick: deleteItemHandler,
      color: 'danger',
      disabled: false,
    },
  ];

  return (
    <CustomModal
      isActive={isModalOpen}
      title={'Delete Item'}
      triggerComponent={<MaterialIcons name="delete" size={20} color="black" />}
      footerButtons={footerButtons}
      onCancel={closeModalHandler}
      onTrigger={onTrigger}
    >
      Are you sure you want to delete this item?
    </CustomModal>
  );
};
