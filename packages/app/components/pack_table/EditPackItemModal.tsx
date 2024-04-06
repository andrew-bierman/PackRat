import React, { cloneElement, isValidElement } from 'react';
import { BaseModal, useModal } from '@packrat/ui';

export const EditPackItemModal = ({
  children,
  isOpen,
  onClose,
  showTrigger,
  triggerComponent,
}) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => {
        closeModal();
        if (onClose) onClose();
      },
      color: '#B22222',
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  const ModalContent = isValidElement(children)
    ? withCloseModalHandler(children)
    : null;

  return (
    <BaseModal
      title={'Edit Item'}
      isOpen={isOpen}
      onClose={onClose}
      footerButtons={footerButtons}
      triggerComponent={triggerComponent}
      showTrigger={showTrigger !== undefined ? showTrigger : true}
    >
      <ModalContent />
    </BaseModal>
  );
};

const withCloseModalHandler = (element) => (props) => {
  const { setIsModalOpen } = useModal();

  return cloneElement(element, {
    ...props,
    closeModalHandler: () => setIsModalOpen(false),
  });
};
