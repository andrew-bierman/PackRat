import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AddItem } from '../item/AddItem';
import { CustomModal } from '../modal';
import { Box } from 'native-base';

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
  const [currentPackId, setCurrentPackId] = useState(
    currentPack ? currentPack._id : undefined,
  );

  return (
    <Box>
      <CustomModal
        isActive={isModalOpen}
        title={'Edit Item'}
        triggerComponent={<MaterialIcons name="edit" size={20} color="black" />}
        onTrigger={onTrigger}
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
          currentPack={currentPack}
          closeModalHandler={closeModalHandler}
          setRefetch={setRefetch}
          refetch={refetch}
        />
      </CustomModal>
    </Box>
  );
};
