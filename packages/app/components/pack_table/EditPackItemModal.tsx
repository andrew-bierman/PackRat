import React, { cloneElement, isValidElement, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AddItem } from '../item/AddItem';
import { View } from 'react-native';
import { BaseModal, useModal } from '@packrat/ui';

export const EditPackItemModal = ({
  children,
  hideIcon = false,
  isOpen,
  toggle,
}) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => closeModal(),
      color: '#B22222',
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  const ModalContent = isValidElement(children)
    ? withCloseModalHandler(children)
    : null;

  return (
    <View>
      <BaseModal
        isOpen={isOpen}
        toggle={toggle}
        title={'Edit Item'}
        hideIcon={hideIcon}
        triggerComponent={<MaterialIcons name="edit" size={20} color="black" />}
        footerButtons={footerButtons}
      >
        <ModalContent />
      </BaseModal>
    </View>
  );
};

const withCloseModalHandler = (element) => (props) => {
  const { setIsModalOpen } = useModal();

  return cloneElement(element, {
    ...props,
    closeModalHandler: () => setIsModalOpen(false),
  });
};
