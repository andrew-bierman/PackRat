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
import useDeleteGlobalItems from '~/hooks/globalItems/useDeleteGlobalItems';
import { PACKQUERYS, PACKREDUCERS, useDeletePackItem } from '~/hooks/packs';
import { useMutation } from '~/hooks/useMutation';

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

  const { mutation: deletePackItemMutation, onSuccesMutation } = useMutation(
    PACKQUERYS.deleteItem,
    PACKREDUCERS.deleteItem,
  );

  const {
    mutation: deleteGlobalItemsMutation,
    onSuccesMutation: deleteGlobalItemsonSuccesMutation,
  } = useDeleteGlobalItems();

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
      deletePackItemMutation.mutate(
        { itemId, packId: pack._id },
        {
          onSuccess: (data) =>
            onSuccesMutation({ ...data, itemId, packId: pack._id }),
        },
      );
    } else {
      if (isConnected) {
        deleteGlobalItemsMutation.mutate(
          { itemId: item },
          {
            onSuccess: (data) => deleteGlobalItemsonSuccesMutation(data),
          },
        );

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
