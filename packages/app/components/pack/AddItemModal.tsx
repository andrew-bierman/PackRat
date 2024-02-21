import { AddItem } from '../item/AddItem';
import useTheme from 'app/hooks/useTheme';
import { BaseModal } from '@packrat/ui';

interface AddItemModalProps {
  currentPackId: string;
  currentPack: any;
  isAddItemModalOpen: boolean;
  setIsAddItemModalOpen: any;
  setRefetch?: () => void;
}

export const AddItemModal = ({
  currentPackId,
  currentPack,
  isAddItemModalOpen,
  setIsAddItemModalOpen,
  setRefetch = () => {},
}: AddItemModalProps) => {
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
      footerComponent={undefined}
    >
      <AddItem
        packId={currentPackId}
        currentPack={currentPack}
        setRefetch={setRefetch}
      />
    </BaseModal>
  );
};
