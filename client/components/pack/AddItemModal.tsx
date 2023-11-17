import { CustomModal } from '../modal';
import { AddItem } from '../item/AddItem';
import useTheme from '~/hooks/useTheme';


export const AddItemModal = ({
  currentPackId,
  currentPack,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  setRefetch = () => {},
}) => {
  const { currentTheme } = useTheme();

  return (
    <CustomModal
      title="Add Item"
      trigger="Add Item"
      isActive={isAddItemModalOpen}
      onTrigger={setIsAddItemModalOpen}
      footerButtons={[
        {
          label: 'Save',
          color: `${currentTheme.colors.secondaryBlue}`,
          onClick: () => setIsAddItemModalOpen(false),
        },
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: () => setIsAddItemModalOpen(false),
        },
      ]}
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
