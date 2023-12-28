import React from 'react';
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
  setRefetch = () => {},
  refetch,
  isModalOpen,
  onTrigger,
  closeModalHandler,
}) => {
  let currentPackId;
  if (currentPack) {
    currentPackId = currentPack._id;
  }

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
        isActive={isModalOpen}
        title={'Edit Item'}
        triggerComponent={<MaterialIcons name="edit" size={20} color="black" />}
        onTrigger={onTrigger}
        footerButtons={footerButtons}
        onCancel={closeModalHandler}
      >
        <AddItem
          _id={packId}
          packId={currentPackId}
          isEdit={true}
          initialData={initialData}
          editAsDuplicate={editAsDuplicate}
          setPage={setPage}
          page={page}
          closeModalHandler={closeModalHandler}
          setRefetch={setRefetch}
          refetch={refetch}
        />
      </CustomModal>
    </View>
  );
};
