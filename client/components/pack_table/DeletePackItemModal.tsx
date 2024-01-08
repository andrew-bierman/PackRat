import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deletePackItem } from '../../store/packsStore';
import { CustomModal } from '../modal';
import {
  deleteGlobalItem,
  deleteItemOffline,
  getItemsGlobal,
} from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { useDeletePackItem } from '~/hooks/packs/useDeletePackItem';
import { queryTrpc, trpc } from '../../trpc';
import { useSelector } from '~/hooks/redux/useSelector';

export const DeletePackItemModal = ({ itemId, pack }) => {
  const utils = queryTrpc.useContext();
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
  const onTrigger = (event) => {
    setIsModalOpen(event);
  };
  const closeTriggerOpen = () => {
    onTriggerOpen(false);
  };
  /**
   * Deletes an item.
   *
   * @param {type} paramName - description of parameter
   * @return {type} description of return value
   */
  const { deletePackItem } = useDeletePackItem();
  const deleteItemHandler = () => {
    if (pack) {
      deletePackItem({ itemId, packId: pack._id });
    } else {
      if (isConnected) {
        dispatch(deleteGlobalItem(itemId));
        utils.getItemsGlobally.invalidate();
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
      color: '#B22222',
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
