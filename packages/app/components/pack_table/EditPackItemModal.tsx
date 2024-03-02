import React, { cloneElement, isValidElement, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AddItem } from '../item/AddItem';
import { View } from 'react-native';
import { BaseModal, useModal } from '@packrat/ui';

export const EditPackItemModal = ({ children, isOpen, onClose }) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => onClose(),
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
        showTrigger={false}
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
