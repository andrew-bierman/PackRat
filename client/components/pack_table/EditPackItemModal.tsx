import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AddItem } from '../item/AddItem';
import { View } from 'react-native';
import { BaseModal, useModal } from '@packrat/ui';

export const EditPackItemModal = ({ children }) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: (_, closeModal) => closeModal(),
      color: '#B22222',
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  return (
    <View>
      <BaseModal
        title={'Edit Item'}
        triggerComponent={<MaterialIcons name="edit" size={20} color="black" />}
        footerButtons={footerButtons}
      >
        {withCloseModalHandler(children)}
      </BaseModal>
    </View>
  );
};

const withCloseModalHandler = (Component) => (props) => {
  const { setIsModalOpen } = useModal();

  return (
    <Component
      {...props}
      closeModalHandler={setIsModalOpen.bind(null, false)}
    />
  );
};
