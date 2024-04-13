import React from 'react';
import { useDeletePackItem } from 'app/hooks/packs/useDeletePackItem';
import { BaseModal } from '@packrat/ui';
import { useDeleteItem } from 'app/hooks/items';

interface DeletePackItemModalProps {
  itemId: string;
  pack?: { _id: string };
  isOpen?: Boolean;
  onClose?: () => void;
  showTrigger?: Boolean;
  triggerComponent?: React.DetailedReactHTMLElement<any, HTMLElement>;
}

export const DeletePackItemModal = ({
  itemId,
  pack,
  isOpen,
  onClose,
  triggerComponent,
  showTrigger,
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
      onClick: (_, closeModal) => {
        closeModal();
        if (onClose) onClose();
      },
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
      triggerComponent={triggerComponent}
      showTrigger={showTrigger !== undefined ? showTrigger : true}
      footerButtons={footerButtons}
    >
      Are you sure you want to delete this item?
    </BaseModal>
  );
};
