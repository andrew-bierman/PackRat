import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AddItem } from '../item/AddItem';
import { CustomModal } from '../modal';
import { View } from 'react-native';

export const EditPackItemModal = ({
  initialData,
  packId,
  currentPack,
  editAsDuplicate,
  setPage,
  page,
  isModalOpen,
  onTrigger,
  closeModalHandler,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  let currentPackId;
  if (currentPack) {
    currentPackId = currentPack.id;
  }

  const onTriggerOpen = (newState) => {
    setModalOpen(newState);
  };
  const closeTriggerOpen = () => {
    onTriggerOpen(false);
  };
  const footerCloseHandler = closeModalHandler ?? closeTriggerOpen;

  const footerButtons = [
    {
      label: 'Cancel',
      onClick: closeModalHandler,
      color: '#B22222',
      disabled: false,
    },
    // add more footer buttons here if needed
  ];

  return (
    <View>
      <CustomModal
        isActive={isModalOpen || modalOpen}
        title={'Edit Item'}
        triggerComponent={<MaterialIcons name="edit" size={20} color="black" />}
        onTrigger={onTrigger || onTriggerOpen}
        footerButtons={footerButtons}
        onCancel={closeModalHandler}
      >
        <AddItem
          id={packId}
          packId={currentPackId}
          isEdit={true}
          initialData={initialData}
          editAsDuplicate={editAsDuplicate}
          setPage={setPage}
          page={page}
          closeModalHandler={closeModalHandler || closeTriggerOpen}
        />
      </CustomModal>
    </View>
  );
};
