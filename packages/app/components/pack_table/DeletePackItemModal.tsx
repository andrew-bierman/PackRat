import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePackItem } from '../../store/packsStore';
import { deleteItemOffline } from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { useDeletePackItem } from 'app/hooks/packs/useDeletePackItem';
import { BaseModal } from '@packrat/ui';
import { useDeleteItem } from 'app/hooks/items';

// TODO implement offline functionality
export const DeletePackItemModal = ({ itemId, pack }) => {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.offlineQueue);

  const { deletePackItem } = useDeletePackItem();
  const { handleDeleteItem } = useDeleteItem();
  const deleteItemHandler = (_, closeModal) => {
    if (pack) {
      deletePackItem({ itemId, packId: pack._id });
    } else {
      if (true) {
        handleDeleteItem(itemId);
      } else {
        dispatch(deleteItemOffline(itemId));
        dispatch(addOfflineRequest({ method: 'deleteItem', data: itemId }));
      }
    }
    closeModal();
  };

  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => closeModal(),
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
    <BaseModal
      title={'Delete Item'}
      triggerComponent={<MaterialIcons name="delete" size={20} color="black" />}
      footerButtons={footerButtons}
    >
      Are you sure you want to delete this item?
    </BaseModal>
  );
};
