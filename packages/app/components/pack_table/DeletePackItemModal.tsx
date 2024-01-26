import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletePackItem } from '../../store/packsStore';
import {
  deleteGlobalItem,
  deleteItemOffline,
  getItemsGlobal,
} from '../../store/globalItemsStore';
import { addOfflineRequest } from '../../store/offlineQueue';
import { useDeletePackItem } from 'app/hooks/packs/useDeletePackItem';
import { queryTrpc, trpc } from '../../trpc';
import { BaseModal } from '@packrat/ui';
interface DeletePackItemModalProps {
  itemId: string;
  pack?: { _id: string }; 
}
export const DeletePackItemModal: React.FC<DeletePackItemModalProps> = ({ itemId, pack }) => {
  const utils = queryTrpc.useContext();
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state) => state.offlineQueue);

  const { deletePackItem } = useDeletePackItem();
  const deleteItemHandler = (_, closeModal) => {
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
