import { CustomModal } from '../modal';
import { AddItem } from '../item/AddItem';

export const AddItemModal = ({
  currentPackId,
  currentPack,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  setRefetch = () => {},
}) => {
  return (
    <CustomModal
      title="Add Item"
      trigger="Add Item"
      isActive={isAddItemModalOpen}
      onTrigger={setIsAddItemModalOpen}
    >
      <AddItem
        packId={currentPackId}
        currentPack={currentPack}
        setIsAddItemModalOpen={setIsAddItemModalOpen}
        setRefetch={() => {
          setRefetch();
        }}
      />
    </CustomModal>
  );
};
