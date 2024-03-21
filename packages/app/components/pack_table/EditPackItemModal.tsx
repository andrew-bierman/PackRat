import React, { cloneElement, isValidElement, useEffect,useRef } from 'react';
import { BaseModal, useModal } from '@packrat/ui';

export const EditPackItemModal = ({ children, isOpen, onClose, showTrigger}) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => {
        closeModal()
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

    const modalRef = useRef(null);

    useEffect(() => {
      setTimeout(() => {
        console.log(modalRef.current, modalRef.current?.setIsModalOpen, 'eRef');
      }, 5000)
    }, [])

  return (
      <BaseModal
        title={'Edit Item'}
        isOpen={isOpen}
        onClose={onClose}
        footerButtons={footerButtons}
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
