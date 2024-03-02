import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useDeletePackItem } from 'app/hooks/packs/useDeletePackItem';
import { BaseModal } from '@packrat/ui';
import { useDeleteItem } from 'app/hooks/items';

interface DeletePackItemModalProps {
  itemId: string;
  pack?: { _id: string };
  isOpen?: Boolean;
  onClose?: () => void;
}

export const DeletePackItemModal = ({
  itemId,
  pack,
  isOpen,
  onClose
}: DeletePackItemModalProps) => {
  const { deletePackItem } = useDeletePackItem();
  const { handleDeleteItem } = useDeleteItem();
  const deleteItemHandler = (_, closeModal) => {
    if (pack) {
      deletePackItem({ itemId, packId: pack._id });
    } else {
      handleDeleteItem(itemId);
    }
    closeModal();
  };

  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => onClose(),
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
      isOpen={isOpen}
      onClose={onClose}
      showTrigger={false}
      footerButtons={footerButtons}
    >
      Are you sure you want to delete this item?
    </BaseModal>
  );
};
