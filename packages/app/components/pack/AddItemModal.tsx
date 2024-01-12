import { AddItem } from '../item/AddItem';
import useTheme from 'app/hooks/useTheme';
import { BaseModal } from '@packrat/ui';

export const AddItemModal = ({
  currentPackId,
  currentPack,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  setRefetch = () => {},
}) => {
  const { currentTheme } = useTheme();

  return (
    <BaseModal
      title="Add Item"
      trigger="Add Item"
      footerButtons={[
        {
          label: 'Save',
          color: `${currentTheme.colors.secondaryBlue}`,
          onClick: (_, closeModal) => closeModal(),
        },
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => closeModal(),
        },
      ]}
    >
      <AddItem
        packId={currentPackId}
        currentPack={currentPack}
        setRefetch={() => {
          setRefetch();
        }}
      />
    </BaseModal>
  );
};
